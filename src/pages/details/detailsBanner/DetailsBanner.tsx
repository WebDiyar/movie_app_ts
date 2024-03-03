import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import dayjs from "dayjs";
import "./detailsBanner.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch.ts";
// import Genres from "../../../components/genres/Genres";
// import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img";
// import PosterFallback from "../../../assets/no-poster.png";
// import { PlayIcon } from "../Playbtn";
// import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { MovieDetails } from "../../../interfacesApi/MovieDetails";
import { TvShowDetails } from "../../../interfacesApi/TvShowDetails";
import { RootState } from "../../../store/store.ts";


const DetailsBanner = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch<MovieDetails | TvShowDetails>(`/${mediaType}/${id}`);
    console.log(data);

    const url = useSelector((state: RootState) => state.home.url);

    // const toHoursAndMinutes = (totalMinutes) => {
    //     const hours = Math.floor(totalMinutes / 60);
    //     const minutes = totalMinutes % 60;
    //     return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    // };
    
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data?.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">

                                        </div>
                                        <div className="right">

                                        </div>
                                    </div>
                                </ContentWrapper>
                            </div>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner
