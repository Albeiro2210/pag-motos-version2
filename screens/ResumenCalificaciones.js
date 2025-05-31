import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable, Dimensions } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getRating } from '../storage/ratingStorage';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const clasificaciones = [
  { id: 'moto_deportiva', nombre: 'Motos Deportivas' },
  { id: 'moto_todoterreno', nombre: 'Motos Todo Terreno' },
  { id: 'moto_urbana', nombre: 'Motos Urbanas' },
  { id: 'moto_adventure', nombre: 'Motos Adventure' },
];

export default function ResumenCalificaciones({ navigation }) {
  const { theme } = useTheme();
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const cargarRatings = async () => {
      const nuevasRatings = {};
      for (const moto of clasificaciones) {
        const valor = await getRating(moto.id);
        nuevasRatings[moto.id] = valor || 0;
      }
      setRatings(nuevasRatings);
    };

    cargarRatings();
  }, []);

  const vibracionProlongada = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
  };

  const handleGoBack = () => {
    vibracionProlongada();
    navigation.navigate('Inicio');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1855349/pexels-photo-1855349.jpeg' }}
      style={[styles.background, { backgroundColor: theme.colors.background }]}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Resumen de Calificaciones</Text>

        {clasificaciones.map((moto) => (
          <View key={moto.id} style={[styles.item, { backgroundColor: theme.colors.overlay }]}>
            <Text style={styles.nombre}>{moto.nombre}</Text>
            <Text style={styles.rating}>
              Calificación: {ratings[moto.id]} estrella{ratings[moto.id] !== 1 ? 's' : ''}
            </Text>
          </View>
        ))}

        <View style={styles.botonContainer}>
          <Pressable
            onPress={handleGoBack}
            style={({ pressed }) => [
              styles.boton,
              { backgroundColor: pressed ? '#b19cd9' : theme.colors.button }
            ]}
          >
            <Text style={[styles.botonTexto, { color: theme.colors.buttonText }]}>
              IR A PÁGINA PRINCIPAL
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000', // texto siempre negro
  },
  item: {
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // texto siempre negro
  },
  rating: {
    fontSize: 16,
    marginTop: 5,
    color: '#000', // texto siempre negro
  },
  botonContainer: {
    marginTop: 30,
    width: width * 0.9,
    alignItems: 'center',
  },
  boton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
