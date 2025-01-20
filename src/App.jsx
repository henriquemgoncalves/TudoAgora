import CarouselFeatured from './components/CarouselFeatured'
import Coin from './components/Coin'
import Footer from './components/Footer'
import Form from './components/Form'
import News from './components/News'
import NewsTwo from './components/NewsTwo'
import Title from './components/Title'
import Weather from './components/Weather'
import './styles/app.sass'

function App() {

  return (
    <div className="app">
      <Coin/>
      <Title/>
      <Weather/>
      <CarouselFeatured/>
      <News/>
      <Form/>
      <NewsTwo/>
      <Footer/>
    </div>
  )
}

export default App
