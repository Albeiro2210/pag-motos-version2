import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchData } from './Apimotos'; 
import { useTheme } from '../ThemeContext'; 

const PantallaDatosMoto = () => {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setMakes(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.text} />
        <Text style={{ color: theme.colors.text }}>Cargando marcas de motos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Marcas de Motos</Text>
      {makes.map((marca, index) => (
        <Text key={index} style={[styles.item, { color: theme.colors.text }]}>
          {index + 1}. {marca}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PantallaDatosMoto;
