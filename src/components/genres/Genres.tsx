import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store/store";
import "./genre.scss"

interface IGenres_id{
  data: number[] | undefined;
}

const Genres = ({ data }: IGenres_id) => {
  const genres = useSelector((state: RootState) => state.home.genres);

  return (
    <div className="genres">
      {
        data?.map((g) => {
          if (!genres[g]?.name) return;
          
          return (
            <div className="genre" key={g}>
              {genres[g]?.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default Genres
