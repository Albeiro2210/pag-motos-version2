import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../ThemeContext'; // Asegúrate de que la ruta sea correcta

export default function MotosUrbanas() {
  const navigation = useNavigation();
  const { theme } = useTheme();

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
          Las motos urbanas son motocicletas diseñadas para facilitar la movilidad en entornos urbanos. Se caracterizan por su tamaño compacto, maniobrabilidad y bajo consumo de combustible, lo que las hace ideales para el tráfico y el estacionamiento en la ciudad.
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
              styles.button,
              styles.boton,
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});


