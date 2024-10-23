import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const Localizacao = () => {
  const [localizacao, setLocalizacao] = useState(null);
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);

  useEffect(() => {
    const obterPermissaoLocalizacao = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          console.log('Permissão de localização concedida');
          setPermissaoConcedida(true);
          obterLocalizacao();
        } else {
          console.log('Permissão de localização negada');
          setPermissaoConcedida(false);
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão:', error);
      }
    };

    const obterLocalizacao = async () => {
      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;
        setLocalizacao({ latitude, longitude });
      } catch (error) {
        console.error('Erro ao obter localização:', error);
      }
    };

    obterPermissaoLocalizacao();
  }, []);

  useEffect(() => {
    // Verifica a permissão sempre que a localização for atualizada
    if (!permissaoConcedida) {
      console.log('Permissão de localização foi revogada');
      setLocalizacao(null); // Limpa a localização se a permissão for revogada
    }
  }, [permissaoConcedida]);

  return (
    <View>
      {localizacao ? (
        <Text>Latitude: {localizacao.latitude}, Longitude: {localizacao.longitude}</Text>
      ) : (
        <Text>Obtendo localização ou permissão negada...</Text>
      )}
    </View>
  );
};

export default Localizacao;
