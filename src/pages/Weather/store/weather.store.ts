import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {OW_APIKEY, OW_BASEURL} from "../../../data/config";
import {WeatherInfo} from "../../../model/WeatherInfo";
import axios from "axios";

interface WeatherState {
    selectedCities: WeatherInfo[],
    pending: boolean,
}

const initialState: WeatherState = {
    selectedCities: [] as WeatherInfo[],
    pending: false,
}

export const fetchWeatherInfo = createAsyncThunk<WeatherInfo, string, { rejectValue: { name: string, weather: [], error: true } }>
('weather/fetchWeatherInfo', async (city: string, {rejectWithValue}) => {
    return axios.get(`${OW_BASEURL}?q=${city}&appid=${OW_APIKEY}`)
        .then(response => response.data)
        .catch(error => rejectWithValue({name: city, weather: [], error: true}));
})

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        deleteCity: (state, action: PayloadAction<string>) => {
            const itemToRemove = state.selectedCities.findIndex(c => c.name === action.payload);
            if (itemToRemove !== -1) {
                state.selectedCities.splice(itemToRemove, 1)
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeatherInfo.pending, (state, action) => {
                state.pending = true
            })
            .addCase(fetchWeatherInfo.fulfilled, (state, action) => {
                state.pending = false
                const itemToAddIndex = state.selectedCities.findIndex(c => c.name === action.payload.name);
                if (itemToAddIndex === -1) {
                    state.selectedCities = state.selectedCities.concat(action.payload)
                } else {
                    state.selectedCities[itemToAddIndex] = action.payload
                }
            })
            .addCase(fetchWeatherInfo.rejected, (state, action) => {
                state.pending = false;
                if(action.payload){
                    const errorItemIndex = state.selectedCities.findIndex(c => c.name === action.payload?.name);
                    if (errorItemIndex === -1) {
                        state.selectedCities = state.selectedCities.concat(action.payload)
                    } else {
                        state.selectedCities[errorItemIndex] = action.payload
                    }
                }
            })
    }
});

export const {
    deleteCity
} = weatherSlice.actions;

export default weatherSlice.reducer
