import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../ThemeContext'; // Ajusta la ruta si es necesario

export default function MotosDeportivas() {
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
        source={{ uri: 'https://media.istockphoto.com/id/1455559262/photo/motorbiker-riding-in-austrian-alps.jpg?s=1024x1024&w=is&k=20&c=U6dGaj42LjYqZ7OqLXKYSmseW-HRbdz_siQTXk8Sbac=' }}
        style={styles.topImage}
      />

      <View style={[styles.bottomContent, { backgroundColor: theme.colors.overlay }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Una moto adventure, también conocida como moto de doble propósito, trail o big trail,
          es una motocicleta diseñada para ser utilizada tanto en carretera como en terrenos off-road.
          Son versátiles y robustas, con características como suspensión de largo recorrido, neumáticos
          de tacos y mayor distancia al suelo para afrontar diferentes superficies.
        </Text>
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
    justifyContent: 'flex-end',
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
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});



