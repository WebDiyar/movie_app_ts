import { useEffect } from "react";
import { fetchingDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { RootState, AppDispatch } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Configuration } from "./interfacesApi/Configuration";
import { Genre, AllGenres } from "./interfacesApi/Genres";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import "./App.scss";

function App() {
  const url = useSelector((state: RootState) => state.home.url);
  console.log("Url: ", url);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchingDataFromApi<Configuration>("/configuration").then((result) => {
      const url = {
        backdrop: result.images.secure_base_url + "original",
        poster: result.images.secure_base_url + "original",
        profile: result.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    try {
      const endPoints: string[] = ["tv", "movie"];
      const allGenres: AllGenres = {};
      const promises = endPoints.map((url) =>
        fetchingDataFromApi<{ genres: Genre[] }>(`/genre/${url}/list`)
      );

      const data = await Promise.all(promises);
      data.forEach((response) => {
        response.genres.forEach((genre) => {
          allGenres[genre.id] = genre;
        });
      });

      dispatch(getGenres(allGenres));
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
