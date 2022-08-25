export interface Weather {
    description: string;
    icon: string;
}

export interface WeatherInfo {
    weather: Weather[];
    name: string;
    error?: boolean
}

