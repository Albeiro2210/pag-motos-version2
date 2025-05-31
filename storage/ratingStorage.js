// src/storage/ratingStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const RATING_KEY = 'RATINGS';

export const saveRating = async (id, rating) => {
  try {
    const existing = await AsyncStorage.getItem(RATING_KEY);
    const ratings = existing ? JSON.parse(existing) : {};
    ratings[id] = rating;
    await AsyncStorage.setItem(RATING_KEY, JSON.stringify(ratings));
  } catch (error) {
    console.error('Error al guardar la calificación:', error);
  }
};

export const getRating = async (id) => {
  try {
    const existing = await AsyncStorage.getItem(RATING_KEY);
    const ratings = existing ? JSON.parse(existing) : {};
    return ratings[id] || 0;
  } catch (error) {
    console.error('Error al obtener la calificación:', error);
    return 0;
  }
};
