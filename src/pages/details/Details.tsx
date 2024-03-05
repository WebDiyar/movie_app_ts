import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import { MovieAndTvVideoResponse } from '../../interfacesApi/MovieAndTvVideos';
import { MovieAndTVShowCreditsResponse } from '../../interfacesApi/MovieAndTvCredits';
import CastComponent from './cast/Cast';
import './details.scss';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch<MovieAndTvVideoResponse | null>(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch<MovieAndTVShowCreditsResponse | null>(`/${mediaType}/${id}/credits`);

    console.log(data, loading, creditsLoading);
    console.log(`Credits: `, credits)

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <CastComponent data={credits?.cast} loading={creditsLoading}/>
        </div>
    )
}

export default Details
