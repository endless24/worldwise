// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";

import styles from "./Form.module.css";
import btnStyles from "./Button.module.css";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useAuth } from "../contexts/AuthContext";
import { convertToEmoji } from "../utils";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  const [lat, lng] = useURLPosition();

  const [cityName, setCityName] = useState("");

  const [country, setCountry] = useState("");

  const [notes, setNotes] = useState("");

  const [UploadImage, setUploadImage] = useState(null);

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const [countryCode, setCountryCode] = useState("");

  const [geocodingError, setGeocodingError] = useState("");

  const [date, setDate] = useState(new Date());

  const { createCity, isLoading, error } = useCities();

  const { userId } = useAuth();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That don't seem to be a city, Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },

    [lat, lng]
  );

  // function that handles new city object
  async function handleSubmit(e) {
    e.preventDefault();

    let url, refId;
    try {
      if (UploadImage === null) return;
      refId = `citiesImg/${v4()}`;

      const imageRef = ref(storage, refId);
      await uploadBytes(imageRef, UploadImage);
      url = await getDownloadURL(imageRef);

      toast.success("City added succefully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
    try {
      if (!cityName || !date) return;
      const newCity = {
        userId,
        cityName,
        country,
        countryCode,
        date,
        files: [{ refId, url }],
        notes,
        position: { lat, lng },
      };
      await createCity(newCity);
      navigate("/app/cities");
    } catch {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on the map 🫡" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(countryCode)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="image">Upload image you got from {cityName}?</label>
        <input
          type="file"
          onChange={(e) => setUploadImage(e.target.files[0])}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          required
        />
      </div>

      <div className={styles.buttons}>
        <button className={`${btnStyles.primary} ${btnStyles.btn}`}>Add</button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
