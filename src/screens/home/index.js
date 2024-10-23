import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, TextInput,} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useSelector } from 'react-redux';
import DATA from '../../Data/Data'; 
import styles from './styles';
import Localizacao from '../../routes/localizacao';
import * as Location from 'expo-location'; // Importando o Location

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = useSelector((state) => state.user.userData);

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);
  const [localizacao, setLocalizacao] = useState(null);
  const [searchType, setSearchType] = useState('lojistas'); // Novo estado para o tipo de busca

  useEffect(() => {
    // Função para obter localização do cliente
    const obterLocalizacao = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;
        setLocalizacao({ latitude, longitude });
      }
    };
    obterLocalizacao();
  }, []);

  useEffect(() => {
    // Fazendo uma requisição simples para testar a conectividade de rede
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => console.log(data)) // Aqui os dados serão exibidos no console
      .catch(error => console.error('Erro na requisição:', error)); // Exibe o erro no console
  }, []);
  
  const handleSearch = async () => {
    if (localizacao) {
      try {
        let response;
        let url;
        let ip = '192.168.15.10:4000';
  
        // Define a URL com base no tipo de busca
        if (searchType === 'produtos') {
          url = `http:///${ip}/busca-produtos?termo=${query}&latitude=${localizacao.latitude}&longitude=${localizacao.longitude}`;
        } else {
          url = `http://${ip}/busca?termo=${query}&latitude=${localizacao.latitude}&longitude=${localizacao.longitude}`;
        }
  
        // Realiza a chamada à API
        response = await fetch(url);
        const data = await response.json();
  
        // Verifica se há resultados de produtos ou lojistas
        if (searchType === 'produtos' && Array.isArray(data) && data.length > 0) {
          navigation.navigate('Resultados', { resultados: data });
        } else if (searchType === 'lojistas' && Array.isArray(data.lojistas) && data.lojistas.length > 0) {
          navigation.navigate('Resultados', { resultados: data.lojistas });
        } else {
          alert(data.message || 'Nenhum resultado encontrado dentro do raio especificado.');
        }
      } catch (error) {
        alert('Erro ao buscar. Tente novamente mais tarde.');
        console.error(error);
      }
    } else {
      alert('Localização não encontrada');
    }
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => alert(`${item.nomeLoja} selecionado`)}
    >
      <View style={styles.storeInfo}>
        <Image
          style={styles.storeImageLoja}
          source={{ uri: item.imgLoja }}
        />
        <Text style={styles.cardTitle}>{item.nomeLoja}</Text>
      </View>
      <Image
        style={styles.cardImage}
        source={{ uri: item.imgProduto }}
      />
    </TouchableOpacity>
  );
  

  return (
    <>
      <Localizacao /> 
      <View style={styles.headerContainer}>
        
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          alt="Sua Empresa"
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            if (userData && userData.length > 0 && userData[0].id && userData[0].email) {
              navigation.navigate('PerfilCliente', {
                id: userData[0].id,
                email: userData[0].email,
              });
            } else {
              alert('Usuário não encontrado.');
            }
          }}
        >
          <Icon name="cog" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        
      </View>

      {/* Seletor para tipo de busca */}
      <View style={styles.selectContainer}>
 
</View>



      {/* Barra de pesquisa e botão de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar..."
          placeholderTextColor="#d9d9d9"
          value={query}
          onChangeText={setQuery}
        />
        
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Picker
    selectedValue={searchType}
    style={styles.picker}
    onValueChange={(itemValue) => setSearchType(itemValue)}
  >
    <Picker.Item label="Lojistas" value="lojistas" />
    <Picker.Item label="Produtos" value="produtos" />
  </Picker>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Define o número de colunas
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
}
