import {AutoComplete} from 'antd';
import React, {useEffect, useState} from 'react';
import CITIES from "../../../../data/cities.json"
import {City} from "../../../../model/City";
import {useDispatch, useSelector} from "react-redux";
import {fetchWeatherInfo} from "../../store/weather.store";
import {selectState} from "../../store/weather.selectors";
import styles from "./Dropdown.module.css"
const {Option} = AutoComplete;

const Dropdown: React.FC = () => {
    const dispatch = useDispatch()
    const {selectedCities} = useSelector(selectState)
    const [value, setValue] = useState<string>("")
    const [options, setOptions] = useState<City[]>(CITIES);

    // Sync dropdown options with selectedCities
    useEffect(() =>{
        const optionsNotSelected = CITIES.filter(option =>
            !(selectedCities.map(selectedCity => selectedCity.name)
            .includes(option.name)))

        setOptions(optionsNotSelected)
    }, [selectedCities])

    const filterOptionsResults = (value: string) => {
        const filteredOptions = CITIES.filter(result => result.name.toLowerCase().includes(value.toLowerCase()))

        setOptions(filteredOptions || CITIES)
    };

    return (
        <AutoComplete className={styles.input}
                      allowClear
                      placeholder="Add a city.."
                      value={value}
                      onChange={setValue}
                      onSearch={filterOptionsResults}
                      onSelect={(value: string) => {
                          dispatch(fetchWeatherInfo(value))
                          setValue("")
                      }}>
            {options.map((city: City) => (
                <Option key={city._id} value={city.name}>
                    {city.name}
                </Option>
            ))}
        </AutoComplete>
    );
};

export default Dropdown;
