import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { TrendingResponse } from "../../../interfacesApi/Trending";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Caresoul from "../../../components/carousel/Carousel";
import "./trending.scss"; 

const Trendig = () => {
    const [endpoint, setEndpoint] = useState<string>("day");
    const { data, loading } = useFetch<TrendingResponse | undefined>(`/trending/all/${endpoint}`);
    
    const ontabChange = (tab: string) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} ontabChange={ontabChange} />
            </ContentWrapper>
            <Caresoul data={data?.results} loading={loading} />
        </div>
    )
}

export default Trendig
