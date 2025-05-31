import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../ThemeContext';
import StarRating from '../components/StarRating';
import { saveRating, getRating } from '../storage/ratingStorage'; 

export default function MotosUrbanas() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const motoId = 'moto_urbana'; 

  useEffect(() => {
    const loadRating = async () => {
      const storedRating = await getRating(motoId);
      setRating(storedRating);
    };
    loadRating();
  }, []);

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    await saveRating(motoId, newRating); 
  };

  const vibracionProlongada = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
  };

  const handlePress = () => {
    vibracionProlongada();
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ImageBackground
        source={{ uri: 'https://cdn.pixabay.com/photo/2014/12/16/03/37/motorcycle-569865_1280.jpg' }}
        style={styles.topHalf}
        imageStyle={{ resizeMode: 'cover' }}
      />

      <View style={[styles.bottomHalf, { backgroundColor: theme.colors.overlay }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Las motos urbanas son motocicletas diseñadas para facilitar la movilidad en entornos urbanos.
          Se caracterizan por su tamaño compacto, maniobrabilidad y bajo consumo de combustible.
        </Text>

        <View style={styles.ratingSection}>
          <Text style={[styles.ratingText, { color: theme.colors.text }]}>Valora esta clasificación:</Text>
          <StarRating rating={rating} onChange={handleRatingChange} />
          <Text style={[styles.ratingText, { color: theme.colors.text }]}>
            Tu calificación: {rating} estrella{rating !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#b19cd9' : theme.colors.button }
            ]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
              IR AL MENÚ PRINCIPAL
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    width: '100%',
  },
  bottomHalf: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    textAlign: 'justify',
  },
  ratingSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    width: '60%',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  buttonText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
