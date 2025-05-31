// components/StarRating.js
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ rating, onChange }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onChange(star)}>
          <FontAwesome
            name={star <= rating ? 'star' : 'star-o'}
            size={32}
            color={star <= rating ? '#FFD700' : '#888'}
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default StarRating;
