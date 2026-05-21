import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar 
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,latlng,population,region,currencies')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => (a.name?.common || '').localeCompare(b.name?.common || ''));
        setCountries(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.darkCenter}>
        <ActivityIndicator size="large" color="#7d5fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.darkContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerHome}>
        <Text style={styles.appTitle}>Paises del Mundo</Text>
        <Text style={styles.appSubtitle}>UDB - DPS441</Text>
      </View>

      <FlatList
        data={countries}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.countryCard}
            onPress={() => navigation.navigate('Detalles', { country: item })}
          >
            <Image source={{ uri: item.flags.png }} style={styles.flagIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nameText}>{item.name.common}</Text>
              <Text style={styles.subText}>{item.capital?.[0] || 'N/A'}</Text>
            </View>
            <View style={styles.goBtn}><Text style={{color: '#fff', fontWeight: 'bold'}}>〉</Text></View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkContainer: { flex: 1, backgroundColor: '#0f0c29' },
  darkCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0c29' },
  headerHome: { padding: 30, paddingTop: 60 },
  appTitle: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  appSubtitle: { fontSize: 16, color: '#6c5ce7', fontWeight: '500' },
  countryCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a3a',
    marginHorizontal: 20, marginVertical: 8, padding: 16, borderRadius: 22,
    borderWidth: 1, borderColor: '#2d3436'
  },
  flagIcon: { width: 50, height: 35, borderRadius: 8, marginRight: 15 },
  nameText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#aaa' },
  goBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#6c5ce7', justifyContent: 'center', alignItems: 'center' }
});