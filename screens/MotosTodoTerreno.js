import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../ThemeContext';
import StarRating from '../components/StarRating';
import { saveRating, getRating } from '../storage/ratingStorage'; 

export default function MotosTodoTerreno() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const motoId = 'moto_todo_terreno'; 

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
        source={{ uri: 'https://cdn.pixabay.com/photo/2024/02/02/13/37/enduro-8548196_1280.jpg' }}
        style={styles.topHalf}
        imageStyle={{ resizeMode: 'cover' }}
      />

      <View style={[styles.bottomHalf, { backgroundColor: theme.colors.overlay }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Las motos todo terreno, también conocidas como "off-road", son motocicletas diseñadas para ser
          conducidas en terrenos difíciles y variados, como caminos de tierra, montañas, bosques y desiertos.
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
    fontSize: 16,
    textAlign: 'justify',
  },
  ratingSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'center',
  },
  button: {
    width: '60%',
    minHeight: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
