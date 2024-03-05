import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "/assets/no-poster.png";
import { RootState } from "../../store/store";
import { MovieOrTvDetails } from "../../interfacesApi/Details";
import "./movieCard.scss";

interface Props{
    data: MovieOrTvDetails;
    fromSearch?: boolean;
    mediaType?: string;
    key?: number;
}

const MovieCard = ({ data, fromSearch, mediaType }: Props) => {
    const url = useSelector((state: RootState) => state.home.url);
    const navigate = useNavigate();

    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    
    return (
        <div
            className="movieCard"
            onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={Number(data.vote_average.toFixed(1))} />
                        <Genres data={data.genre_ids} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;