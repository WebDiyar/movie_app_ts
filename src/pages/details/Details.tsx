import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import { MovieAndTvVideoResponse } from '../../interfacesApi/MovieAndTvVideos';
import { MovieAndTVShowCreditsResponse } from '../../interfacesApi/MovieAndTvCredits';
import CastComponent from './cast/CastComponent';
import VideosSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
import './details.scss';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch<MovieAndTvVideoResponse | null>(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch<MovieAndTVShowCreditsResponse | null>(`/${mediaType}/${id}/credits`);

    console.log('data: ', data);

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <CastComponent data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
