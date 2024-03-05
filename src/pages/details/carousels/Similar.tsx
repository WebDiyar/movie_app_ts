import Carousel from "../../../components/carousel/Carousel";
import { useFetch } from "../../../hooks/useFetch";
import { AllDataMovieOrTvDetails } from "../../../interfacesApi/Details";

interface Props{
    mediaType: string | undefined;
    id: string | undefined;
}

const Similar = ({ mediaType, id }: Props) => {
    const { data, loading } = useFetch<AllDataMovieOrTvDetails>(`/${mediaType}/${id}/similar`);
    console.log(data);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;