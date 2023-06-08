import express from 'express';
import * as weatherController from '../controllers/weather.controller';
const router = express.Router();

router.get('', weatherController.getAllData);


router.post('/create', weatherController.CreateweatherData);

router.put('/:_id', weatherController.updateWeatherData);


export default router;
