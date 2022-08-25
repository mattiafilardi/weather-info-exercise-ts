import React from 'react';
import Header from "./components/Header/Header";
import Dropdown from "./components/Dropdown/Dropdown";
import CitiesList from "./components/CitiesList/CitiesList";
import styles from "./WeatherPage.module.css"

const WeatherPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Dropdown />
            <CitiesList />
        </div>
    )
};

export default WeatherPage;
