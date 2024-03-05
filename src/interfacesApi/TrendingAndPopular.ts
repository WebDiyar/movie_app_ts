export interface GeneralMedia {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[] | undefined;
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    // Properties that might not exist on all types
    original_title?: string;
    original_name?: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    video?: boolean;
    media_type?: string; // Assuming this might be added dynamically or is specific to certain types
}
