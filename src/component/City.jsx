import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));

function City() {
  //using useParams to get id of the city
  const { id } = useParams();
  // console.log(id);
  const { currentCity, getCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );
  // loading;
  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity ? currentCity : {};
  let dateStamp;
  if (currentCity !== null) {
    // converting timestamp to js date
    let timestampInSeconds = date?.seconds;
    dateStamp = new Date(timestampInSeconds * 1000);
    // console.log(dateStamp);
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(dateStamp || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
