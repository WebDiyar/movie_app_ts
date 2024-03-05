import { useRef, FC } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../../store/store";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "/assets/no-poster.png";
// import { Movie } from "../../interfacesApi/Trending";
// import { MoviePopular, TVShowPopular } from "../../interfacesApi/Popular";
// import { MoviePopular, TVShowPopular, Movie } from "../../interfacesApi/TrendingPopular";
import { GeneralMedia } from "../../interfacesApi/TrendingAndPopular";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { MovieOrTvDetails } from "../../interfacesApi/Details";
import "./carousel.scss"

interface CarouselProps{
    data: (GeneralMedia | MovieOrTvDetails)[]  | undefined;
    loading: string | boolean | null;
    endpoint?: string;
    title?: string;
}

const Carousel: FC<CarouselProps> = ({ data, loading, endpoint, title}) => {
    const carouselContainer = useRef<HTMLDivElement | null>(null);
    const url = useSelector((state: RootState) => state.home.url);
    const navigate = useNavigate();

    const navigation = (dir: string) => {
        const container = carouselContainer.current;
        if (!container) return;

        const scrollAmount =
            dir === 'left'
                ? container?.scrollLeft - (container?.offsetWidth + 20)
                : container?.scrollLeft + (container?.offsetWidth + 20);

        container?.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const container = carouselContainer.current;
    console.log(container);

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <span className="title skeleton"></span>
                    <span className="date skeleton"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            
                            return (
                                <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={Number(item.vote_average.toFixed(1))} />
                                        <Genres data={item.genre_ids} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item?.name}</span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}


            </ContentWrapper>
        </div>
    )
}

export default Carousel
