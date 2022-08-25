import React from 'react';
import {Empty, Spin, Typography} from 'antd';
import {useSelector} from "react-redux";
import {selectState} from "../../store/weather.selectors";
import CitiesListItem from "../CitiesListItem/CitiesListItem";
import styles from "./CitiesList.module.css"
const {Text} = Typography

const CitiesList = () => {
    const { selectedCities, pending } = useSelector(selectState)

    return (
        <>
            {pending && <Spin size="default" className={styles.spin} />}
            {selectedCities.length > 0 ?
                selectedCities.map((city) => <CitiesListItem city={city} />)
                : <Empty
                    image="https://cdn-icons-png.flaticon.com/512/117/117298.png"
                    imageStyle={{
                        height: 40,
                    }}
                    description={
                        <Text italic>No city selected</Text>
                    }
                >
                </Empty>
            }
        </>
    );
}

export default CitiesList;
