import propTypes from "prop-types";

import styles from "./CountryItem.module.css";
import { convertToEmoji } from "../utils";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{convertToEmoji(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}
CountryItem.propTypes = {
  country: propTypes.object.isRequired,
};

export default CountryItem;
