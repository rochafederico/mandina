export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  telegram: {
    url: process.env.API_TELEGRAM,
    token: process.env.API_TELEGRAM_TOKEN,
    getUpdates: process.env.API_TELEGRAM_PATH_UPTADES,
    sendMessage: process.env.API_TELEGRAM_PATH_SEND,
  },
  ai: {
    generative: {
      url: process.env.API_AI_URL,
      key: process.env.API_AI_KEY
    }
  },
  weather: {
    url: process.env.WEATHER_URL,
    location: process.env.WEATHER_LOCATION,
    apikey: process.env.WEATHER_APIKEY
  },
  dialogflow: {
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  }
});