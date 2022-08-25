export interface Coord {
    lon: number;
    lat: number;
}

export interface City {
    _id: number;
    name: string;
    country: string;
    coord: Coord;
}
