import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import api from '../../services/api';
import Localizacao from '../../routes/localizacao'; // Importando o módulo de localização


const postagens = [
  {
    id: '1',
    lojista: {
      nome: 'Loja A',
      imagem: 'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
    },
    produto: {
      imagem: 'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
      categoria: 'Eletrônicos',
      preco: 'R$ 200,00',
      especificacao: 'Produto XYZ',
    },
    curtidas: 150,
    comentarios: 10,
  },
  {
    id: '2',
    lojista: {
      nome: 'Loja B',
      imagem: 'https://images.pexels.com/photos/2531183/pexels-photo-2531183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
    },
    produto: {
      imagem: 'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
      categoria: 'Roupas',
      preco: 'R$ 80,00',
      especificacao: 'Produto ABC',
    },
    curtidas: 200,
    comentarios: 20,
  },
];

export default function Home() {
  const [logradouro, setLogradouro] = useState('Carregando...');
  const [lojistasProximos, setLojistasProximos] = useState([]);
  const [showDetails, setShowDetails] = useState(false); 
  const [melhoresLojistas, setMelhoresLojistas] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    const obterLocalizacao = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        // Obter logradouro (opcional)
        const detalhesLocalizacao = await Location.reverseGeocodeAsync(currentLocation.coords);
        const logradouroCompleto = detalhesLocalizacao[0]?.name || 'Localização desconhecida';
        setLogradouro(logradouroCompleto);

        fetchLojistasProximos(latitude, longitude); // Busca os lojistas com as coordenadas obtidas
        fetchMelhoresLojistas(latitude, longitude); // Busca os lojistas com as coordenadas obtidas
      } else {
        console.log('Permissão de localização negada');
        setLogradouro('Permissão de localização negada');
      }
    };

    obterLocalizacao();
  }, []);

  const fetchLojistasProximos = async (latitude, longitude) => {
    try {
        const response = await api.get(`http://192.168.15.10:4000/lojistas-proximos?latitude=${latitude}&longitude=${longitude}`);
        console.log(response.data); // Log para verificar a resposta

        // Acessa a propriedade `lojistas` que contém o array
        const lojistas = response.data.lojistas;

        // Verifique se lojistas é um array antes de mapear
        if (Array.isArray(lojistas)) {
            const data = lojistas.map(lojista => ({
                ...lojista,
                distanciaFormatada: `${lojista.distancia} km`, // Supondo que 'distancia' esteja em km
            }));
            setLojistasProximos(data);
        } else {
            console.error('A propriedade "lojistas" não é um array:', lojistas);
        }
    } catch (error) {
        console.error('Erro ao buscar lojistas:', error);
    }
};


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderLojistasProximos = ({ item }) => (
    <TouchableOpacity 
      style={[styles.lojaProximaContainer, { marginRight: 10 }]} 
      onPress={() => {
        console.log('Navegando para Lojista com ID:', item.id); // Log de depuração
        navigation.navigate('Lojista', { lojistaId: item.id });
      }} 
    >
      <Image source={{ uri: item.imagemLojista }} style={styles.lojaProximaImagem} />
      <View style={styles.lojaProximaInfo}>
        <Text style={styles.lojaProximaNome}>{item.nomeEmpresa}</Text>
        <Text style={styles.lojaProximaDistancia}>
          {item.distanciaFormatada || 'Distância não disponível'}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  const fetchMelhoresLojistas = async (latitude, longitude) => {
    try {
      const response = await api.get(`http://192.168.15.10:4000/lojistas-melhor-avaliados?latitude=${latitude}&longitude=${longitude}`);
      console.log(response.data); // Log para verificar a resposta da API
  
      // Verifique se a resposta é um array de lojistas
      if (Array.isArray(response.data.lojistas)) {
        setMelhoresLojistas(response.data.lojistas);
      } else {
        console.error('A resposta da API não contém um array de lojistas');
      }
    } catch (error) {
      console.error('Erro ao buscar melhores lojistas:', error);
    }
  };
  
  
  const renderLojistasMelhorAvaliados = ({ item }) => (
    <TouchableOpacity 
      style={[styles.lojaAvaliacaoContainer, { marginRight: 10 }]} 
      onPress={() => {
        console.log('Navegando para Lojista com ID:', item.id);
        navigation.navigate('Lojista', { lojistaId: item.id });
      }}
    >
      <View style={styles.avaliacaoContainer}>
        <Icon name="star" size={14} color="#FFD700" />
        <Text style={styles.avaliacaoText}>{item.avaliacao}</Text>
      </View>
      <Image source={{ uri: item.imagemLojista }} style={styles.lojaAvaliacaoImagem} />
      <Text style={styles.lojaAvaliacaoNome}>{item.nome}</Text>
      <Text style={styles.lojaAvaliacaoCategoria}>{item.categoria}</Text>
  
    </TouchableOpacity>
  );

  const renderPostagem = ({ item }) => (
    <View style={styles.cardPostagemContainer}>
      <View style={styles.postagemHeader}>
        <Image source={{ uri: item.lojista.imagem }} style={styles.postagemLojistaImagem} />
        <View style={styles.postagemHeaderInfo}>
          <Text style={styles.postagemLojistaNome}>{item.lojista.nome}</Text>
          <Text style={styles.postagemDistancia}>{item.lojista.distancia} km</Text>
        </View>
      </View>
      <Image source={{ uri: item.produto.imagem }} style={styles.postagemImagemProduto} />
      <View style={styles.postagemInfo}>
        <View style={styles.postagemActions}>
          <TouchableOpacity>
            <Text style={styles.postagemIcon}>♡ {item.curtidas}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.postagemIcon}>💬 {item.comentarios}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.postagemIcon}>✚ Salvar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.postagemCategoria}>{item.produto.categoria}</Text>
        <Text style={styles.postagemPreco}>{item.produto.preco}</Text>
        <Text style={styles.postagemEspecificacao}>{item.produto.especificacao}</Text>
      </View>
    </View>
  );

  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={toggleDetails} style={styles.arrowButton}>
            <Icon name="arrow-forward-ios" size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.logradouroText}>{logradouro}</Text>
          <View style={styles.arrowPlaceholder} />
        </View>

        {showDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Detalhes</Text>
            <Text style={styles.infoText}>Cidade: <Text style={styles.infoValue}>São Paulo</Text></Text>
            <Text style={styles.infoText}>Estado: <Text style={styles.infoValue}>SP</Text></Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Lojistas Próximos</Text>
        <FlatList
          data={lojistasProximos}
          renderItem={renderLojistasProximos}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Lojistas Melhor Avaliados</Text>
        <FlatList
          data={melhoresLojistas}
          renderItem={renderLojistasMelhorAvaliados}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Postagens Recentes</Text>
        <FlatList
          data={postagens}
          renderItem={renderPostagem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}
