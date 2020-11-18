import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Layout.module.css";
import Logo from "./logo.svg";
import Link from "next/link";
import { Brightness6Rounded } from "@material-ui/icons";
const Layout = ({ children, title = "World Ranks" }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // on load set document tag to be as theme state
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
    setTheme(localStorage.getItem("theme"));
  }, []);

  const handleTheme = themeMode => {
    setTheme(themeMode);
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("theme", themeMode);
  };

  // Switch Theme Function
  const switchTheme = () => {
    if (theme === "light") {
      handleTheme("dark");
    } else if (theme === "dark") {
      handleTheme("light");
    }
  };

  return (
    <div className={styles.container}>
      {/* Head tag here is equal to head tag in html */}
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.appLogo}>
            <Logo />
          </a>
        </Link>
        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <Brightness6Rounded />
        </button>
      </header>
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Ahmed @ devchallengs.io</footer>
    </div>
  );
};
export default Layout;
