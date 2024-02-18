import { useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { UpcomingResponseApi } from '../../../interfacesApi/Upcoming';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './heroBanner.scss'

const HeroBanner = () => {
    const [background, setBackgroud] = useState<string | undefined>("");
    const [query, setQuery] = useState<string>("");
    const url = useSelector((state: RootState) => state.home.url);
    const navigate = useNavigate();

    const {data, loading} = useFetch<UpcomingResponseApi>("/movie/upcoming");

    useEffect(() => {
        const background = url.backdrop +  data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackgroud(background); 
        console.log(background);
    }, [data, url])

    const handleSearchQuery = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className='heroBanner'>
            {
                !loading && (
                    <div className="backdrop-img">
                        <Img src={background} />
                    </div>
                )
            }

            <div className="opacity-layer"></div>

            <ContentWrapper >
                <div className="heroBannerContent">
                    <span className="title">Welcome!</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={handleSearchQuery} />
                        <button className='btn-search'>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner;