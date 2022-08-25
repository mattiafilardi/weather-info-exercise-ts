import React from 'react';
import {Col, Image, Row, Typography} from "antd";
import {deleteCity, fetchWeatherInfo} from "../../store/weather.store";
import {WeatherInfo} from "../../../../model/WeatherInfo";
import {useDispatch} from "react-redux";
import {BsExclamationCircle, RiDeleteBin7Line, WiCloudRefresh} from "react-icons/all";
import styles from './CitiesListItem.module.css';
const { Text } = Typography;

interface ListItemProps {
    city: WeatherInfo
}

const CitiesListItem = ({city}: ListItemProps) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <Row align="middle" justify="space-around">
                <Col xs={24} xl={6}>
                    <Row justify="center" align="middle">
                        <Text strong>{city.name}</Text>
                    </Row>
                </Col>

                <Col xs={24} xl={12}>
                    {!city.error ? (
                        <Row justify="center" align="middle">
                            <Image
                                alt={city.weather[0].description}
                                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                width={50}
                                height={50}
                                preview={false}
                            />

                            <Text italic>{city.weather[0].description}</Text>
                        </Row>
                    ) : (
                        <Row justify="center" align="middle">
                            <BsExclamationCircle color="red" className={styles.icon}/>
                            <Text italic className={styles.errorText}>Unable to load data</Text>
                        </Row>
                    )}
                </Col>
                <Col xs={24} xl={6}>
                    <Row justify="center" align="middle">
                        <WiCloudRefresh onClick={() => dispatch(fetchWeatherInfo(city.name))} className={styles.bigIcon}/>
                        <RiDeleteBin7Line onClick={() => dispatch(deleteCity(city.name))} className={styles.icon}/>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default CitiesListItem;
