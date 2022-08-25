import React from 'react';
import styles from "./Header.module.css"
import {TiWeatherCloudy} from "react-icons/all";
import {Row} from "antd";

const Header = () => {
    return (
        <div className={styles.container}>
            <Row justify="center" align="middle">
                <TiWeatherCloudy className={styles.icon} color="white"/>
                <h1 className={styles.title}>
                    Weather Info
                </h1>
            </Row>
        </div>
    )
}

export default Header;
