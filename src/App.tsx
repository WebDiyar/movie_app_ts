import { useEffect } from 'react'
import './App.css'
import { fetchingDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchingDataFromApi('/movie/popular')
      .then(result => {
        console.log(result);
        dispatch(getApiConfiguration(result))
      });
    

  }

  return (
    <>
      App
    </>
  )
}

export default App
