import { Schema, model } from 'mongoose';

const weatherSchema = new Schema(
  {
    city: {
      type: String
    },
    country: {
        type: String
      },
    temperature: {
      type: String
    },
    wind: {
      type: String
    },
    description: {
      type: String
    },
    forecast: [
      {
        day: String,
        temperature: String,
        wind: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Weather', weatherSchema);

/*
data: {
  temperature: '+13 °C',
  wind: '4 km/h',
  description: 'Partly cloudy',
  forecast: [
    { day: '1', : '25 °C', wind: '2 km/h' },
    { day: '2', temperature: '+14 °C', wind: '3 km/h' },
    { day: '3', temperature: '19 °C', wind: '9 km/h' }
  ]
}
*/
