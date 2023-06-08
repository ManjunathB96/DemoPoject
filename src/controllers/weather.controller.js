import HttpStatus from 'http-status-codes';
import * as WeatherService from '../services/weather.service';



/**
 * Controller to get all weather data
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllData = async (req, res, next) => {
  try {
    const data = await WeatherService.getAllData();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All details fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to a Createweather Data
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const CreateweatherData = async (req, res, next) => {
  try {
    const data = await WeatherService.CreateweatherData();
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'weather Data created successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const updateWeatherData = async (req, res, next) => {
  console.log("_id- cntrl---",req.params._id);
  console.log("body from contr----",req.body);
  try {
    const data = await WeatherService.updateWeatherData(req.params._id,req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'weather Data updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
