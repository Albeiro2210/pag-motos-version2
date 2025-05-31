import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground, Pressable, Dimensions } from 'react-native';
import { fetchData } from './Apimotos'; 
import { useTheme } from '../ThemeContext'; 
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PantallaDatosMoto = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setMakes(data.query.categorymembers);
      setLoading(false);
    };
    loadData();
  }, []);

  const vibracionProlongada = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
  };

  const handleGoBack = () => {
    vibracionProlongada();
    navigation.goBack();
  };

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/1855349/pexels-photo-1855349.jpeg' }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={[styles.loadingContainer, { backgroundColor: 'rgba(255,255,255,0.7)' }]}>
          <ActivityIndicator size="large" color={'#000'} />
          <Text style={[styles.loadingText, { color: '#000' }]}>Cargando marcas de motos...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1855349/pexels-photo-1855349.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.titulo, { color: '#000' }]}>Marcas de Motos</Text>

        {makes.map((categorymember, index) => (
          <View key={index} style={[styles.item, { backgroundColor: theme.colors.overlay }]}>
            <Text style={[styles.itemText, { color: '#000' }]}>
              {index + 1}. {categorymember.title}
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
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  itemText: {
    fontSize: 16,
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

export default PantallaDatosMoto;
