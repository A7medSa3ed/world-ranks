import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  // state
  const [keyword, setKeyword] = useState("");

  // Filter countries on write country name.
  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  //hanlde change of input
  const handleChange = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  // Count Country
  const countCountries =
    filteredCountries.length > 0 ? (
      <> Found {filteredCountries.length} countries</>
    ) : (
      <> There Is No Country Founded </>
    );

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>{countCountries}</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="filter by Name, Region, Sub Region"
            onChange={handleChange}
          />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

// getStaticProps --> is used to handle in this page only
export const getStaticProps = async () => {
  const res = await fetch("http://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return { props: { countries } };
};
