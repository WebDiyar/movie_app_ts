import Carousel from "../../../components/carousel/Carousel";
import { useFetch } from "../../../hooks/useFetch";
import { AllDataMovieOrTvDetails } from "../../../interfacesApi/Details";

interface Props {
    mediaType: string | undefined;
    id: string | undefined;
}

const Recommendation = ({ mediaType, id }: Props) => {
    const { data, loading } = useFetch<AllDataMovieOrTvDetails>(`/${mediaType}/${id}/recommendations`);
    
    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;