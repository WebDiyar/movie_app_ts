import { useState } from "react";
import Caresoul from "../../../components/carousel/Carousel";
import { useFetch } from "../../../hooks/useFetch";
import { MovieResponse, TVShowResponse } from "../../../interfacesApi/Popular";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

const TopRated = () => {
    const [endpoint, setEndpoint] = useState<string>("movie");
    const { data, loading } = useFetch<MovieResponse | TVShowResponse | undefined>(`/${endpoint}/top_rated`);
    console.log(data);

    const ontabChange = (tab: string) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} ontabChange={ontabChange} />
            </ContentWrapper>
            <Caresoul data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default TopRated
