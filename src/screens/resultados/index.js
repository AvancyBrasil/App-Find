import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function Resultados() {
  const navigation = useNavigation();
  const route = useRoute();
  const { resultados } = route.params;

  const renderItem = ({ item }) => {
    const isLojista = item.nomeEmpresa !== undefined;

    return (
  
      <View style={styles.itemContainer}>
        {isLojista ? (
          <TouchableOpacity onPress={() => navigation.navigate('Lojista', { email: item.email, id: item.id })}>
            <Text style={styles.nomeLoja}>{item.nomeEmpresa}</Text>
            <Text style={styles.distancia}>{item.distanciaFormatada}</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.nomeProduto}>{item.nome}</Text>
            <Text style={styles.preco}>Preço: {item.preco}</Text>
            <Text style={styles.lojista}>Lojista: {item.lojista.nomeEmpresa}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
      <TouchableOpacity style ={styles.backButton} onPress={navigation.goBack}> 
        <AntDesign  name="leftcircle" size={35} color="white" /> 
        </TouchableOpacity>
      <FlatList
        data={resultados}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#050521',
  },
  itemContainer: {
    marginVertical: 8,
    padding: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  nomeLoja: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distancia: {
    fontSize: 14,
    color: '#666',
  },
  preco: {
    fontSize: 16,
    color: '#333',
  },
  lojista: {
    fontSize: 14,
    color: '#666',
  },
});
