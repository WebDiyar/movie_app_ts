import { useRef, useState, FC } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../../store/store";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../../public/assets/no-poster.png";
import { Movie } from "../../interfacesApi/Trending";

import "./carousel.scss"

interface CarouselProps{
    data: Movie[] | undefined;
    loading: string | boolean | null;
}

const Carousel: FC<CarouselProps> = ({ data, loading }) => {
    const carouselContainer = useRef<HTMLDivElement>();
    const url = useSelector((state: RootState) => state.home.url);
    const navigate = useNavigate();

    const navigation = (dir: string) => {

    }

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
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems">
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            
                            return (
                                <div key={item.id} className="carouselItem" >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item?.title || item?.name}</span>
                                        <span className="date">
                                            {dayjs(item.release_date).format("MMM D, YYYY")}
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
