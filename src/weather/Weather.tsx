import './weather.css';
import Api from './api/Api';
import { useEffect, useState } from 'react';
import weather from '../assets/images/weather.jpg';
import search from '../assets/images/search.ico'

const Weather = () => {
    const [cityName, setCityName] = useState('');
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData]: any = useState();
    const getWeatherInfo = async (location: string) => {

        try {
            const response = await Api.get(`/data/2.5/weather?q=${location}&appid=fe4feefa8543e06d4f3c66d92c61b69c`);
            setWeatherData(response.data)
            setLoading(false);
            console.log(response.data)

        } catch (e) {
            setLoading(true);
        }
    }
    useEffect(() => {
        const getWeatherData = async () => {
            await getWeatherInfo('Addis Ababa');
        }
        getWeatherData();

        return () => { }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await getWeatherInfo(cityName);
        setCityName('');

    }
    return <div
        style={{
            backgroundImage: `url(${weather})`
        }}
        className="weather-container">

        <form onSubmit={handleSubmit} className='weather-form'>
            <input className='search-text'
                value={cityName}
                onChange={(e) => { setCityName(e.target.value) }}
                type="text" placeholder="Enter city name" />
            <button type='submit'>    <img className='search-icon' src={search} />
            </button>
        </form>
        {!loading ?
            <div className='weather-info'>
                <div className='weather-card'>
                    <div className='weather-title'>
                        {weatherData.name}, {weatherData.sys.country}
                    </div>
                    <div className='weather-body'>
                        <p className='humidity'><b>Humidity</b>{weatherData.main.humidity}%</p>

                        <p className='pressure'><b>Pressure</b>{weatherData.main.pressure}</p>
                        <p className='temp-max'><b>Temprature(Max)</b><b>{(weatherData.main.temp_max - 273.15).toFixed(2)}<sup>o</sup>C</b></p>
                        <p className='temp-max'><b>Temprature(Max)</b><b>{(weatherData.main.temp_min - 273.15).toFixed(2)}<sup>o</sup>C</b></p>

                        <p className='wind'><b>Wind Speed</b><b>{weatherData.wind.speed}MPH</b></p>
                    </div>
                    <div className='weather-footer'>
                        <p className='description'>{weatherData.weather[0].description}</p>
                    </div>
                </div>
            </div> : <h1>Weather info not found... Enter Valid Loaction please..</h1>}
    </div>
}

export default Weather;