import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert, Modal, TextInput, Platform, Linking,  ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native'; // Importando useRoute
import api from '../../services/api'; // Importando a API
import { useSelector } from 'react-redux';




const PerfilLojista = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDescricao, setModalVisibleDescricao] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLojista, setSelectedLojista] = useState(null);
  const [error, setError] = useState('');
  const [topRatedProducts, setTopRatedProducts] = useState([]); // Adicionei o estado para os produtos
  const route = useRoute();
  const { lojistaId } = route.params; // Acessa o ID do lojista passado
  const userData = useSelector((state) =>
    Array.isArray(state.user.userData) ? state.user.userData : [state.user.userData]
  );
  
  // Acessando o primeiro elemento do array (se houver)
  const user = userData.length > 0 ? userData[0] : null;

  console.log(user.id);
  

  const GOOGLE_MAPS_API_KEY = 'AIzaSyBQhcE8wYt1ukHH6sZOUC0W3dwrad7JLhc'; // Substitua com a sua chave da API do Google Maps

  useEffect(() => {
    const obterLocalizacao = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        setUserLocation({ latitude, longitude });

        // Chama a função para pegar os dados do lojista assim que a localização for obtida
        pegarLojistaPorId(lojistaId, latitude, longitude);
      } else {
        console.log('Permissão de localização negada');
        setError('Permissão de localização negada');
      }
    };

    obterLocalizacao();
  }, [lojistaId]); // Adiciona lojistaId como dependência

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/produtos?idLojista=${lojistaId}`); // Aqui, trocamos `id` por `lojistaId`
        const data = await response.json();
        setTopRatedProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    if (lojistaId) { // Adiciona uma verificação para garantir que `lojistaId` esteja definido
      fetchProducts();
    }
  }, [lojistaId]); // Adiciona lojistaId como dependência

  const seguirLojista = async () => {
    if (!userData || !selectedLojista) {
      alert('Erro: Dados do usuário ou lojista não encontrados.');
      return;
    }
  
    const userId = user.id; // ID do usuário, vem do Redux
    const lojistaId = selectedLojista.id; // ID do lojista, vem dos dados carregados

    try {
      const response = await api.post('/seguir', {
        userId,
        lojistaId,
      });
      alert(response.data.mensagem);
      setIsFollowing(true);
    } catch (error) {
      console.error('Erro ao seguir o lojista:', error);
      alert('Erro ao tentar seguir o lojista.');
    }
  };

  // Função para deixar de seguir o lojista
  const pararSeguirLojista = async () => {
    try {
      const response = await api.delete('/deixar-seguir', {
        data: {
          userId: user.id,
          lojistaId: lojistaId,
        },
      });
      alert(response.data.mensagem);
      setIsFollowing(false)
    } catch (error) {
      console.error('Erro ao deixar de seguir o lojista:', error);
    }
  };

  const verificarSeguindo = async () => {
    try {
      const response = await api.get('/verificar-seguindo', {
        params: { userId: user.id, lojistaId },
      });
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Erro ao verificar o status de seguir:', error);
    }
  };

  useEffect(() => {
    verificarSeguindo();
  }, []);


  
  const openSpecifications = (product) => {
    setSelectedProduct(product);
    setModalVisibleDescricao(true);
  };

  const closeSpecifications = () => {
    setSelectedProduct(null);
    setModalVisibleDescricao(false);
  };

  // Função para atualizar a nota de estrelas
  const handleStarPress = (star) => {
    setRating(star);
  };

  // Função para enviar a avaliação
  const enviarAvaliacao = async () => {
    if (!rating || !feedback) {
      Alert.alert('Por favor, complete a avaliação e o feedback.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/avaliar-lojista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lojistaId: lojistaId, 
          usuarioId: user.id, 
          nota: rating,
          comentario: feedback
        })
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Avaliação enviada!', result.mensagem);
      } else {
        Alert.alert('Erro', result.mensagem || 'Não foi possível enviar a avaliação.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a avaliação.');
    } finally {
      setModalVisible(false);
      setRating(0); // Reseta a avaliação
      setFeedback(''); // Reseta o feedback
    }
  };

  const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation?.latitude},${userLocation?.longitude}&destination=${selectedLojista?.latitude},${selectedLojista?.longitude}&travelmode=driving`;
  
  
  return (
    <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      {/* Div Superior */}
      <View style={styles.divSuperior}>
      {selectedLojista ? ( 
        <View style={styles.card}>
        <Image
              source={{ uri: selectedLojista.imagemLojista }} // Usando a imagem do lojista
              style={styles.fotoPerfil}
            />
          <Text style={styles.nomeLojista}>{selectedLojista ? selectedLojista.nomeEmpresa : 'Carregando...'}</Text>
          <Text style={styles.categoria}>Categoria: {selectedLojista ? selectedLojista.categoria : 'Carregando...'}</Text>
          <Text style={styles.distancia}>Distância: {selectedLojista ? selectedLojista.distancia : 'Carregando...'}</Text>
          <Text style={styles.distancia}>{selectedLojista ? selectedLojista.horarioFuncionamento : 'Carregando...'}</Text>
        
          {/* Avaliação */}
      <View style={styles.avaliacaoContainer}>
        <Ionicons name="star-outline" size={22} color="#FFD700" />
        <Text style={styles.avaliacaoTexto}> Avaliação ({selectedLojista ? selectedLojista.avaliacao : 'Carregando...'})</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.setaContainer}>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

          

         {/* Localização */}
      {Platform.OS === 'web' ? (
      <View style={styles.localizacaoContainer}>
        <Ionicons name="location-outline" size={22} color="#007BFF" />
        <Text style={styles.localizacaoTexto}>Localização</Text>
        <TouchableOpacity onPress={() => { Linking.openURL(mapUrl); }}>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
  
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation?.latitude || 0,
            longitude: userLocation?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {userLocation && (
            <Marker coordinate={userLocation}>
              <Ionicons name="person-circle" size={40} color="blue" />
            </Marker>
          )}
          {selectedLojista && (
            <Marker coordinate={{ latitude: selectedLojista.latitude, longitude: selectedLojista.longitude }}>
              <Ionicons name="business" size={40} color="red" />
            </Marker>
          )}
          {userLocation && selectedLojista && (
            <MapViewDirections
              origin={userLocation}
              destination={{
                latitude: selectedLojista.latitude,
                longitude: selectedLojista.longitude,
              }}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
        </MapView>
      )}

           {/* Seguir */}
          <View style={styles.seguirContainer}>
            <Ionicons name={isFollowing ? "person-remove-outline" : "person-add-outline"} size={22} color="#007BFF" />
            <TouchableOpacity onPress={isFollowing ? pararSeguirLojista : seguirLojista} style={styles.setaContainer}>
              <Text style={styles.seguirTexto}>{isFollowing ? "Parar de seguir" : "Seguir"}</Text>
            </TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          </View>

          {/* Modal para Avaliação */}
          <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>Avaliar Lojista</Text>

          {/* Estrelas de avaliação no modal alinhadas horizontalmente */}
          <View style={styles.avaliacao}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={28}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Campo de texto para feedback */}
          <TextInput
            style={styles.textInput}
            placeholder="Escreva seu feedback..."
            placeholderTextColor="#A0A0A0"
            maxLength={50}
            value={feedback}
            onChangeText={setFeedback}
          />

          {/*Botão de enviar avaliação */}
          <TouchableOpacity onPress={enviarAvaliacao} style={styles.enviarButton}>
            <Text style={styles.enviarButtonText}>Enviar Avaliação</Text>
          </TouchableOpacity>

          {/* Botão de fechar modal */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fecharButton}>
            <Text style={styles.fecharButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
        </View>
        ) : (
          <Text>Carregando dados do lojista...</Text> // Exibe uma mensagem enquanto os dados estão sendo carregados
        )}
      </View>

      <Image
        source={{ uri: 'URL_DA_IMAGEM_ILUSTRATIVA' }}
        style={styles.imagemIlustrativa}
      />

      {/* Container para as seções de produtos */}

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

          <View style={styles.imageContainer}>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>R$ {product.preco}</Text>
            </View>
            <Image source={{ uri: product.imagemProduto }} style={styles.productImage} />
          </View>

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
            <TouchableOpacity style={styles.specificationButton} onPress={() => openSpecifications(product)}>
              <Text style={styles.specificationText}>Especificações</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal para exibir a descrição do produto */}
      {selectedProduct && (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisibleDescricao}
    onRequestClose={closeSpecifications}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalBox}>
        <Text style={styles.modalHeader}>Especificações do Produto</Text>
        <ScrollView style={styles.modalBody}>
          <Text style={styles.modalText}>{selectedProduct.descricao}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.closeModalButton} onPress={closeSpecifications}>
          <Text style={styles.closeModalButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}
    </View>
    </View>
    </ScrollView>
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
    marginTop: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
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
    color: '#FF5800', // Azul
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
    marginTop: 280,
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

  imageContainer: {
    position: 'relative', // Necessário para que priceTag seja posicionado corretamente
    overflow: 'hidden', // Evita que a priceTag seja cortada
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo preto com transparência
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1, // Garante que o preço fique acima da imagem
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
  localizacaoContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#00000030', // Cinza claro
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  localizacaoTexto: {
    fontSize: 16,
    marginLeft: 5,
    color: '#8E8E93', // Cinza
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalBody: {
    maxHeight: 200,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
  },
  closeModalButton: {
    backgroundColor: '#FF5800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  

});
