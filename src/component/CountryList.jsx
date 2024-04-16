import propTypes from "prop-types";

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  //loading
  if (isLoading) return <Spinner />;
  // getting message across users, when no city in the list
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  //mapping through the cities array to get the city name that are unique
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      // If the country is not already present, add it to the accumulator array
      return [...arr, { country: city.country, emoji: city.emoji }];
    //return the accumulator array
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
CountryList.propTypes = {
  cities: propTypes.array.isRequired, // Define prop type for cities as an array
  isLoading: propTypes.bool.isRequired, // Define prop type for isLoading as a boolean
};

export default CountryList;
