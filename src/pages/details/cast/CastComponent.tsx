import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Cast } from "../../../interfacesApi/MovieAndTvCredits";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import avatar from "/assets/avatar.png";
import Img from "../../../components/lazyLoadImage/Img";
import "./cast.scss";

interface Props {
  data: Cast[] | undefined;
  loading: string | boolean | null;
}

const CastComponent = ({ data, loading }: Props) => {
  const url = useSelector((state: RootState) => state.home.url);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              const imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={item.id} className="listItem">
                  <div className="profileImg">
                    <Img src={imgUrl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default CastComponent;
