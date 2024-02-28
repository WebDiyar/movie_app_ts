import { useState } from "react";
import "./trending.scss"; 
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useFetch } from "../../../hooks/useFetch";
import { TrendingResponse } from "../../../interfacesApi/Trending";
import Caresoul from "../../../components/carousel/Carousel";


const Trendig = () => {
    const [endpoint, setEndpoint] = useState<string>("day");
    const { data, loading } = useFetch<TrendingResponse>(`/trending/all/${endpoint}`);
    console.log(data);
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
