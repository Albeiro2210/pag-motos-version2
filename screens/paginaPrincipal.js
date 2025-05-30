import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';
import { Video } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { fetchData } from './Apimotos';
import { useTheme } from '../ThemeContext';

const { width } = Dimensions.get('window');

const PaginaPrincipal = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchData().then(data => console.log(data));
  }, []);

  const vibracionProlongada = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1855349/pexels-photo-1855349.jpeg' }}
      style={[styles.background, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.titulo, { color: theme.colors.text }]}>PÁGINA DE MOTOS</Text>

          <View style={styles.botones}>
            {[
              { label: 'DEPORTIVAS', route: 'MOTOS_DEPORTIVAS' },
              { label: 'URBANAS', route: 'MOTOS_URBANAS' },
              { label: 'TODO TERRENO', route: 'MOTOS_TODO_TERRENO' },
              { label: 'ADVENTURE', route: 'MOTOS_ADVENTURE' }
            ].map(({ label, route }) => (
              <Pressable
                key={route}
                onPress={() => {
                  vibracionProlongada();
                  navigation.navigate(route);
                }}
                style={({ pressed }) => [
                  styles.boton,
                  { backgroundColor: pressed ? '#b19cd9' : theme.colors.button }
                ]}
              >
                <Text style={[styles.botonTexto, { color: theme.colors.buttonText }]}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.videoContainer}>
            <Video
              source={require('../assets/video/video.mp4')}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              useNativeControls
              style={styles.video}
            />
          </View>
        </ScrollView>

        <View style={styles.botonInferior}>
          <Pressable
            onPress={() => {
              vibracionProlongada();
              toggleTheme();
            }}
            style={({ pressed }) => [
              styles.boton,
              { backgroundColor: pressed ? '#b19cd9' : theme.colors.button }
            ]}
          >
            <Text style={[styles.botonTexto, { color: theme.colors.buttonText }]}>
              CAMBIAR TEMA
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  botones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10
  },
  boton: {
    width: '40%',
    margin: 10,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center'
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  video: {
    width: width * 0.9,
    height: 200,
    backgroundColor: '#000',
    borderRadius: 10
  },
  botonInferior: {
    padding: 20,
    marginBottom: 40,
    alignItems: 'center',
  }
});

export default PaginaPrincipal;



