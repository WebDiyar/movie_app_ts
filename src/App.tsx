import { useEffect } from 'react'
import { fetchingDataFromApi } from './utils/api'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';
import { RootState, AppDispatch } from './store/store';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import './App.scss'
import { Configuration } from './interfacesApi/Configuration';

function App() {
  const url = useSelector((state: RootState) => state.home.url);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchingDataFromApi<Configuration>('/configuration')
      .then((result) => {

        const url = {
          backdrop: result.images.secure_base_url + 'original',
          poster: result.images.secure_base_url + "original",
          profile: result.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url)) // configuration data
      });
  }

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
