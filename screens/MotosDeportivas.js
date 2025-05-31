import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../ThemeContext';
import StarRating from '../components/StarRating';
import { saveRating, getRating } from '../storage/ratingStorage'; 

export default function MotosDeportivas() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const motoId = 'moto_deportiva'; 

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
        source={{ uri: 'https://cdn.pixabay.com/photo/2020/09/29/12/29/motorcycle-5612672_1280.jpg' }}
        style={styles.topImage}
      />

      <View style={[styles.bottomContent, { backgroundColor: theme.colors.overlay }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Las motos deportivas son motocicletas diseñadas y optimizadas para la velocidad, aceleración,
          frenado y manejo en curvas, tanto en pistas como en carreteras de asfalto...
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={[styles.ratingLabel, { color: theme.colors.text }]}>Valora esta clasificación:</Text>
          <StarRating rating={rating} onChange={handleRatingChange} />
          <Text style={[styles.ratingLabel, { color: theme.colors.text }]}>
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
  topImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  bottomContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
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
