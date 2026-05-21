import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform, ScrollView 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchWeather } from '../api/weatherApi';

export default function DetailScreen({ route }) {
  const { country } = route.params;
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('cargando');
  
  const capital = country.capital?.[0] || 'City';
  const moneda = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';

  // Buscador dinámico de imágenes JPG de alta calidad para la capital
  const fotoCapital = `https://loremflickr.com/g/800/600/${capital.replace(/\s/g, '')},city,architecture/all`;

  useEffect(() => {
    const obtenerClima = async () => {
      const resultado = await fetchWeather(capital);
      if (resultado.status === 'success') {
        setWeather(resultado.data);
        setStatus('listo');
      } else {
        setStatus(resultado.status);
      }
    };
    obtenerClima();
  }, [capital]);

  return (
    <ScrollView style={styles.darkContainer} bounces={false}>
      <View style={styles.heroBox}>
        <Image source={{ uri: fotoCapital }} style={styles.heroImg} />
        <LinearGradient colors={['transparent', '#0f0c29']} style={styles.heroGrad}>
          <Text style={styles.detName}>{country.name.common}</Text>
          <View style={styles.capPill}><Text style={styles.capPillText}>{capital}</Text></View>
        </LinearGradient>
      </View>

      <View style={styles.detailContent}>
        {/* INFORMACIÓN ADICIONAL */}
        <View style={styles.row}>
          <View style={styles.infoSquare}>
            <Text style={styles.infoLabel}>POBLACIÓN</Text>
            <Text style={styles.infoVal}>{country.population.toLocaleString()}</Text>
          </View>
          <View style={styles.infoSquare}>
            <Text style={styles.infoLabel}>MONEDA</Text>
            <Text style={styles.infoVal}>{moneda}</Text>
          </View>
        </View>

        {/* CONTENEDOR CLIMA */}
        <View style={styles.weatherGlass}>
          <Text style={styles.sectionTitle}>Clima Actual</Text>
          {status === 'listo' ? (
            <View style={styles.wData}>
              <View style={styles.wCol}>
                <Text style={styles.wTemp}>{Math.round(weather.main.temp)}°C</Text>
                <Text style={styles.wDesc}>{weather.weather[0].description}</Text>
              </View>
              <View style={styles.wCol}>
                <Text style={styles.wSub}>💧 Humedad: {weather.main.humidity}%</Text>
                <Text style={styles.wSub}>💨 Viento: {weather.wind.speed} m/s</Text>
              </View>
            </View>
          ) : (
            <View style={styles.wError}>
              <Text style={{color: '#ff7675', textAlign: 'center'}}>
                {status === 'api_error' ? "⚠️ API Key inactiva o inválida." : 
                 status === 'not_found' ? "📍 Ciudad no encontrada en el servicio." : "Obteniendo datos..."}
              </Text>
            </View>
          )}
        </View>

        {/* MAPA */}
        <Text style={[styles.sectionTitle, {marginTop: 25}]}>Ubicación Geográfica</Text>
        <View style={styles.mapWrap}>
          {Platform.OS === 'web' ? (
            <View style={styles.webMsg}><Text style={{color: '#fff'}}>Mapa disponible en Android/iOS</Text></View>
          ) : (
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: country.latlng[0],
                longitude: country.latlng[1],
                latitudeDelta: 7,
                longitudeDelta: 7,
              }}
            >
              <Marker coordinate={{ latitude: country.latlng[0], longitude: country.latlng[1] }} />
            </MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  darkContainer: { flex: 1, backgroundColor: '#0f0c29' },
  heroBox: { height: 420, width: '100%' },
  heroImg: { width: '100%', height: '100%' },
  heroGrad: { position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', padding: 25 },
  detName: { fontSize: 42, fontWeight: 'bold', color: '#fff' },
  capPill: { backgroundColor: '#6c5ce7', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start', marginTop: 12 },
  capPillText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  detailContent: { padding: 20, marginTop: -25 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  infoSquare: { backgroundColor: '#1a1a3a', padding: 16, borderRadius: 22, width: '48%', alignItems: 'center' },
  infoLabel: { fontSize: 11, color: '#6c5ce7', fontWeight: 'bold', marginBottom: 6, textTransform: 'uppercase' },
  infoVal: { fontSize: 15, color: '#fff', fontWeight: 'bold' },
  weatherGlass: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 22, borderRadius: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#fff', marginBottom: 15, marginLeft: 5 },
  wData: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wCol: { flex: 1 },
  wTemp: { fontSize: 38, fontWeight: 'bold', color: '#fff' },
  wDesc: { color: '#6c5ce7', textTransform: 'capitalize', fontWeight: '600' },
  wSub: { color: '#bbb', fontSize: 13, marginTop: 4 },
  wError: { padding: 10, alignItems: 'center' },
  mapWrap: { height: 260, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: '#2d3436', marginTop: 5 },
  webMsg: { flex: 1, backgroundColor: '#1a1a3a', justifyContent: 'center', alignItems: 'center' }
});