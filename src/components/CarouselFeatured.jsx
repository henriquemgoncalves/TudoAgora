import React, { useEffect, useState } from 'react'
import  "react-responsive-carousel/lib/styles/carousel.min.css"
import  {  Carousel  }  from  'react-responsive-carousel'
import '../styles/components/carousel.sass'

const CarouselFeatured = () => {

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const getFeatured = async() => {
            const storedFeatures = JSON.parse(localStorage.getItem('carouselFeatures')) || [];

            const cacheTimestamp = localStorage.getItem('carouselFeaturesTimestamp');
            const now = Date.now()

            if(storedFeatures.length > 0 && cacheTimestamp && now - cacheTimestamp < 8 * 60 * 60 * 1000){
                setFeatures(storedFeatures);
                return;
            }
            try {
                const response = await fetch('https://gnews.io/api/v4/top-headlines?category=world&lang=pt&country=br&max=7&apikey=3a550c9d9237cdfd4ebc1ff7de5f673f');

                const res = await response.json();

                if(res.articles && res.articles.length > 0 ){
                    setFeatures(res.articles);
                    localStorage.setItem('carouselFeatures', JSON.stringify(res.articles));
                    localStorage.setItem('carouselFeaturesTimestamp', now)
                }
            } catch (error) {
                console.log("Erro ao buscar dados: ", error); 
            }
        };  
        getFeatured();
    }, []);

  return (
    <section id='featured'>
        <Carousel className='carousel' infiniteLoop autoPlay interval={4000} showIndicators={true} showThumbs={false} showStatus={false}>
            {features.map((featured, index) => (
                <div className="item" key={index}>
                    <a href={featured.url} target='_blank'>
                        <img src={featured.image} alt='Imagem Noticia'/>
                        <h4>{featured.title}</h4>
                    </a> 
                </div>
            ))}
        </Carousel>
    </section>
  )
}

export default CarouselFeatured
