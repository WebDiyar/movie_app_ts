import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { MovieResponse, TVShowResponse } from "../../../interfacesApi/Popular";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Caresoul from "../../../components/carousel/Carousel";
import './popular.scss';

const Popular = () => {
    const [endpoint, setEndpoint] = useState<string>("movie");
    const { data, loading } = useFetch<MovieResponse | TVShowResponse | undefined>(`/${endpoint}/popular`);

    const ontabChange = (tab: string) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={["Movies", "TV Shows"]} ontabChange={ontabChange} />
            </ContentWrapper>
            <Caresoul data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Popular
