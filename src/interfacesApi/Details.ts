export interface AllDataMovieOrTvDetails {
  page: number;
  results: MovieOrTvDetails[];
  total_pages: number;
  total_results: number;
}

export interface MovieOrTvDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection?: null; // Specific to movies
  budget?: number; // Specific to movies
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: string; // Specific to movies
  in_production?: boolean; // Specific to TV shows
  languages?: string[]; // Specific to TV shows
  original_language: string;
  original_title?: string; // Specific to movies
  original_name?: string; // Specific to TV shows
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date?: string; // Specific to movies
  revenue?: number; // Specific to movies
  runtime?: number; // Specific to movies
  episode_run_time?: number[]; // Specific to TV shows
  seasons?: Season[]; // Specific to TV shows
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title?: string; // Specific to movies
  name?: string; // Specific to TV shows
  type?: string; // Specific to TV shows
  video?: boolean; // Specific to movies
  vote_average: number;
  vote_count: number;
  created_by?: CreatedBy[]; // Specific to TV shows
  first_air_date?: string; // Specific to TV shows
  last_air_date?: string; // Specific to TV shows
  last_episode_to_air?: LastEpisodeToAir; // Specific to TV shows
  next_episode_to_air?: null; // Assuming always null based on provided data, specific to TV shows
  networks?: Network[]; // Specific to TV shows
  number_of_episodes?: number; // Specific to TV shows
  number_of_seasons?: number; // Specific to TV shows
  origin_country?: string[]; // Specific to TV shows
  media_type: string;
  genre_ids?: number[] | undefined;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
