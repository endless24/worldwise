import { createContext, useContext, useEffect, useReducer } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "./AuthContext";

// const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode

    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function CitiesProvider({ children }) {
  //distructured the state immediately
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { userId } = useAuth();

  //fetching cities function
  useEffect(
    function () {
      async function fetchCities() {
        dispatch({ type: "loading" });
        try {
          const cityQuery = query(
            collection(db, "cities"),
            where("userId", "==", userId)
          );
          const querySnapshot = await getDocs(cityQuery);

          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch({ type: "cities/loaded", payload: data });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading cities...",
          });
        }
      }
      fetchCities();
    },
    [userId]
  );

  //getting the a particular with the id
  async function getCity(id) {
    //preventing api not to fetch multiple time
    if (id === currentCity?.id) return;

    dispatch({ type: "loading" });
    try {
      const docRef = doc(db, "cities", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }

  //async function that delete city
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // await fetch(`${BASE_URL}/cities/${id}`, {
      //   method: "DELETE",
      // });
      await deleteDoc(doc(db, "cities", id));

      dispatch({ type: "city/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  //creatin a new city city function
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const data = await addDoc(collection(db, "cities"), {
        ...newCity,
      });
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  const value = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
    error,
    convertToEmoji,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

// consuming context function
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };
