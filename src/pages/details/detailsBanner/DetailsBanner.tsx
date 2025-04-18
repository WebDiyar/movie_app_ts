import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlayIcon } from "../Playbtn";
import { RootState } from "../../../store/store.ts";
import { MovieOrTvDetails } from "../../../interfacesApi/Details.ts";
import { MovieAndTvVideo } from "../../../interfacesApi/MovieAndTvVideos.ts";
import { Crew } from "../../../interfacesApi/MovieAndTvCredits.ts";
import { useFetch } from "../../../hooks/useFetch.ts";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import CircleRating from "../../../components/circleRating/CircleRating";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "/assets/no-poster.png";
import dayjs from "dayjs";
import "./detailsBanner.scss";

interface Props {
  video: MovieAndTvVideo | undefined;
  crew: Crew[] | undefined;
}

const DetailsBanner = ({ video, crew }: Props) => {
  const url = useSelector((state: RootState) => state.home.url);
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | number | null | undefined>(
    null
  );

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch<MovieOrTvDetails | null>(
    `/${mediaType}/${id}`
  );

  const genres = data?.genres.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director") || [];
  const writer =
    crew?.filter(
      (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    ) || [];

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const renderReleaseDate = (date: string | undefined, label: string) => {
    if (date) {
      return (
        <div className="infoItem">
          <span className="text bold">{label}</span>
          <span className="text">{dayjs(date).format("MMM D, YYYY")}</span>
        </div>
      );
    }
    return null;
  };

  const renderRuntime = (runtime: number) => {
    return (
      <div className="infoItem">
        <span className="text bold">Runtime: </span>
        <span className="text">{toHoursAndMinutes(runtime)}</span>
      </div>
    );
  };

  const renderNumberOfEpisodes = (numberOfEpisodes: number) => {
    return (
      <div className="infoItem">
        <span className="text bold">Number of episodes: </span>
        <span className="text">{numberOfEpisodes}</span>
      </div>
    );
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title}
                                                (${dayjs(
                                                  data?.release_date ||
                                                    data?.first_air_date
                                                ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={genres} />

                    <div className="row">
                      <CircleRating
                        rating={Number(data.vote_average.toFixed(1))}
                      />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {renderReleaseDate(data?.release_date, "Release Date")}
                      {renderReleaseDate(
                        data?.first_air_date,
                        "First Air Date"
                      )}

                      {data.runtime && renderRuntime(data.runtime)}
                      {data.number_of_episodes &&
                        renderNumberOfEpisodes(data.number_of_episodes)}
                    </div>

                    {director.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((w, i) => (
                            <span key={i}>
                              {w.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {!!data?.created_by && data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((c, i) => (
                            <span key={i}>
                              {c.name}
                              {!!data?.created_by &&
                                data?.created_by.length - 1 !== i &&
                                ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
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
  );
};

export default DetailsBanner;
