
import HeroBanner from './heroBanner/HeroBanner'
import Trendig from './trending/Trendig'
import './home.scss'

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trendig />
      <div style={{height: 1000}}>

      </div>
    </div>
  )
}

export default Home
