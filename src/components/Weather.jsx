import React, { useEffect, useState } from 'react'
import '../styles/components/weather.sass'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeather = async() => {
            try {
                const url = 'http://api.weatherapi.com/v1/forecast.json?key=f17bc373399e413d8fa180035251201&q=auto:ip&days=7&aqi=no&alerts=no';
                const respnse = await fetch(url);
                const data = await respnse.json();
                console.log(data);
                setWeatherData(data);
                setLoading(false);

            } catch (error) {
                console.log("Ocorreu um erro na busca de dados:", error);
                setLoading(false);
            }
        }
        getWeather();
    }, []);

    const getDays = (dateString) => {
        const dayOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const date = new Date(dateString);
        return dayOfWeek[date.getDay()];
    };

    const getFutureDays = () => {
        if(!weatherData) return [];
        return weatherData.forecast.forecastday.slice(2);
    }

    if(loading){
        return <p>Carregando previsão do tempo.</p>;
    }

    if(!weatherData){
        return <p>Não foi possível carregar a previsão do tempo</p>;
    }

    const futureDays = getFutureDays();

  return (
    <div className='weather'>
        <div className="content-item">
            <img src={weatherData.current.condition.icon} alt='Condição do tempo'/>
            <h2>{Math.round(weatherData.current.temp_c)} Cº</h2>
            <p>{weatherData.location.name}</p>
        </div>

        <div className="list-days">
           <ul>
                {futureDays.map((day,index) => (
                    <li key={index}>
                        <img src={day.day.condition.icon} alt='Condição do tempo'/>
                        <h3>{Math.round(day.day.maxtemp_c)} Cº</h3>
                        <p>{getDays(day.date)}</p>
                    </li>
                ))}
            </ul> 
        </div>
            
        
        
    </div>
  )
}

export default Weather
