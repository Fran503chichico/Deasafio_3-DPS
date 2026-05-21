// Asegúrate de colocar tu API Key real aquí sin espacios
const WEATHER_KEY = '6391d32e0fd6e0edc6b3640106e8c806'; 

export const fetchWeather = async (capital) => {
  if (!capital) return { status: 'no_capital', data: null };
  
  try {
    const queryCity = encodeURIComponent(capital);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&lang=es&appid=${WEATHER_KEY}`
    );
    
    if (response.status === 401) {
      return { status: 'api_error', data: null };
    }
    if (!response.ok) {
      return { status: 'not_found', data: null };
    }
    
    const data = await response.json();
    return { status: 'success', data };
  } catch (error) {
    return { status: 'error', data: null };
  }
};