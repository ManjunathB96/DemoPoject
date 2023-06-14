import Weather from '../models/weather.model';
const axios = require('axios');
// //get all users
// export const getAllData = async (req) => {
//   const data = await User.find();
//   return data;
// };

//get all users using axios
export const getAllData = async () => {
  const response = await axios.get(
    'https://goweather.herokuapp.com/weather/Curitiba',{
    }
  );
  const result = response.data;
  return result;
};
/*
export const getAllData = async () => {
  const response = await fetch(
    'https://goweather.herokuapp.com/weather/France'
  );
  const data = await response.json();
  console.log(data);
  return data;
};
*/
//create new user
export const CreateweatherData = async () => {
  const weatherData = await fetch('http://localhost:5000/api/v1/weatherData');
  const response = await weatherData.json();
  const data = { ...response.data };
  return await Weather.create(data);
};

export const updateWeatherData = async (_id, body) => {
  const weatherData = await fetch(
    'http://localhost:3000/api/v1/weatherData/create');
  const response = await weatherData.json();
  const data = { ...response.data};
  const result = await Weather.findByIdAndUpdate({ _id: _id }, data, {
    new: true
  });
  return result;
};


