export interface Genre {
    id: number;
    name: string;
}

export interface Genres {
    genres: Genre[];
}

export interface AllGenres {
    [key: number]: Genre
}