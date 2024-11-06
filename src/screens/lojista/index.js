import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';

const PerfilLojista = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLojista, setSelectedLojista] = useState({});
  const [error, setError] = useState('');
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const route = useRoute();
  const { lojistaId } = route.params;

  useEffect(() => {
    const obterLocalizacao = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;
        setUserLocation({ latitude, longitude });
        pegarLojistaPorId(lojistaId, latitude, longitude);
      } else {
        console.log('Permissão de localização negada');
        setError('Permissão de localização negada');
      }
    };

    if (lojistaId) {
      obterLocalizacao();
    }
  }, [lojistaId]);

  const pegarLojistaPorId = async (id, latitude, longitude) => {
    try {
      const response = await api.get(`/lojistas?id=${id}&latitude=${latitude}&longitude=${longitude}`);
      setSelectedLojista(response.data);
      setError('');
    } catch (error) {
      console.error('Erro ao obter detalhes do lojista:', error);
      setError('Erro ao obter detalhes do lojista.');
    }
  };

  const handleStarPress = (star) => setRating(star);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/produtos?idLojista=${lojistaId}`);
        setTopRatedProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    if (lojistaId) {
      fetchProducts();
    }
  }, [lojistaId]);

  const openSpecifications = (id) => {
    console.log(`Abrir especificações do produto com ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divSuperior}>
        {selectedLojista.nomeEmpresa ? (
          <View style={styles.card}>
            <Image source={{ uri: selectedLojista.imagemLojista }} style={styles.fotoPerfil} />
            <Text style={styles.nomeLojista}>{selectedLojista.nomeEmpresa}</Text>
            <Text style={styles.categoria}>Categoria: {selectedLojista.categoria}</Text>
            <Text style={styles.distancia}>Distância: {selectedLojista.distancia}</Text>

            <View style={styles.avaliacaoContainer}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.avaliacaoTexto}>Avaliação ({selectedLojista.avaliacao})</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.setaContainer}>
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.seguirContainer}>
              <Ionicons name="person-add" size={24} color="#007BFF" />
              <Text style={styles.seguirTexto}>Seguir</Text>
              <TouchableOpacity onPress={() => alert('Seguindo Lojista!')} style={styles.setaContainer}>
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <Modal
              animationType="fade"
              transparent
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitulo}>Avaliar Lojista</Text>
                  <View style={styles.avaliacao}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                        <Ionicons
                          name={star <= rating ? 'star' : 'star-outline'}
                          size={28}
                          color="#FFD700"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Escreva seu feedback..."
                    placeholderTextColor="#A0A0A0"
                    maxLength={50}
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Avaliação enviada:', rating, feedback);
                      setModalVisible(false);
                    }}
                    style={styles.enviarButton}
                  >
                    <Text style={styles.enviarButtonText}>Enviar Avaliação</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fecharButton}>
                    <Text style={styles.fecharButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <Text>Carregando dados do lojista...</Text>
        )}
      </View>

      <Image source={{ uri: 'URL_DA_IMAGEM_ILUSTRATIVA' }} style={styles.imagemIlustrativa} />

      <View style={styles.sectionsContainer}>
        <Text style={styles.sectionTitle}>Todas as Postagens</Text>
        {topRatedProducts.map((product) => (
          <View key={product.id} style={styles.cardContainer}>
            <View style={styles.header}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.nome}</Text>
                <Text style={styles.productCategory}> • {product.categoria}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{product.avaliacao}</Text>
              </View>
            </View>

            <Image source={{ uri: product.imagemProduto }} style={styles.productImage} />
            <View style={styles.infoContainer}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={20} color="#8E8E93" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="message-circle" size={20} color="#8E8E93" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="send" size={20} color="#8E8E93" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.specificationButton} onPress={() => openSpecifications(product.id)}>
                <Text style={styles.specificationText}>Especificações</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      
    </View>
  );
};

export default PerfilLojista;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Mudando para branco
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  divSuperior: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0', // Usando um cinza claro
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF', // Mantendo branco
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginTop: 220,
  },
  
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nomeLojista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1C1C1E', // Um cinza escuro
  },
  categoria: {
    fontSize: 16,
    color: '#007BFF', // Azul
    marginBottom: 5,
  },
  distancia: {
    fontSize: 16,
    color: '#777', // Cinza
    marginBottom: 10,
  },
  avaliacaoContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#00000030', // Cinza claro
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  avaliacaoTexto: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000', // Preto
  },
  setaContainer: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF', // Branco
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333', // Cinza escuro
    marginBottom: 20,
  },
  avaliacao: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ddd', // Cinza claro
    width: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    marginBottom: 20,
    color: '#333', // Cinza escuro
  },
  enviarButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF5800', // Laranja
    alignItems: 'center',
    marginBottom: 10,
  },
  enviarButtonText: {
    color: '#FFF', // Branco
    fontSize: 16,
    fontWeight: '500',
  },
  fecharButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  fecharButtonText: {
    color: '#333', // Cinza escuro
    fontSize: 16,
    fontWeight: '500',
  },
  imagemIlustrativa: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  sectionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 200,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1C1C1E', // Cinza escuro
    marginBottom: 15,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Branco
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E', // Cinza escuro
  },
  productCategory: {
    fontSize: 14,
    color: '#8E8E93', // Cinza claro
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#8E8E93', // Cinza claro
    marginLeft: 4,
  },
  productImage: {
    width: '100%',
    height: 175,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 8,
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },

  specificationButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FF5800', // Laranja
    borderRadius: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  specificationText: {
    color: '#FFF', // Branco
    fontSize: 14,
    fontWeight: '500',
  },

  seguirContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#00000030', // Cinza claro
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  seguirTexto: {
    fontSize: 16,
    marginLeft: 5,
    color: '#8E8E93', // Cinza
  },
});