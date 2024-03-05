export interface MovieAndTvVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at?: string; // This field is optional
    id: string;
}

export interface MovieAndTvVideoResponse{
    id: number;
    results: MovieAndTvVideo[];
}