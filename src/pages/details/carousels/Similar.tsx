import { useFetch } from "../../../hooks/useFetch";
import { AllDataMovieOrTvDetails } from "../../../interfacesApi/Details";
import Carousel from "../../../components/carousel/Carousel";
interface Props {
  mediaType: string | undefined;
  id: string | undefined;
}

const Similar = ({ mediaType, id }: Props) => {
  const { data, loading } = useFetch<AllDataMovieOrTvDetails>(
    `/${mediaType}/${id}/similar`
  );
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
