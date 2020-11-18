import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Link from "next/link";

// Get Country By Passing Country ID To It .
const getCountry = async id => {
  const res = await fetch(`http://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};

// Our Component
const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  // Get All Borders of the country
  const getBorders = async () => {
    // we use (promise.all) to get all borders at one time.
    const borders = await Promise.all(
      // it will make many request depend on array of counry
      country.borders.map(border => getCountry(border))
    );
    setBorders(borders);
  };
  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name} />

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_area}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native Name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.map(({ flag, name, alpha3Code }, index) => (
                  <Link href={`/country/${alpha3Code}`} key={index}>
                    <div className={styles.details_panel_borders_country}>
                      <img src={flag} alt={name} />
                      <div className={styles.details_panel_borders_name}>
                        {name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Country;

// [id].js --> to handle data from other pages, we must create file has this style of naming.
// getServerSideProps --> is used to handle data between pages
// it is used to if we run app in local
export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: { country },
  };
};
