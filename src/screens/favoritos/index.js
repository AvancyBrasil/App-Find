import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const favoritos = [
  {
    id: '1',
    nome: 'Sushi Por 0,99 - Suzano',
    tipo: 'Japonesa',
    distancia: '8,1 km',
    tempo: '43-53 min',
    preco: 'R$ 19,98',
    imagem: 'https://img.freepik.com/fotos-gratis/sushi-aberto-com-peixe-e-arroz_140725-995.jpg?t=st=1730734299~exp=1730737899~hmac=86ba663c7d5046adade3d6330d5a82dee507de865ffd505be0e1236ff826c915&w=740',
    favorito: true,
  },
  {
    id: '2',
    nome: 'Hot Dog do Sul',
    tipo: 'Lanches',
    distancia: '1,0 km',
    status: 'Fechado',
    preco: 'R$ 5,99',
    imagem: 'https://img.freepik.com/fotos-gratis/delicioso-cachorro-quente-de-angulo-alto-e-batatas-fritas_23-2149235977.jpg?t=st=1730734247~exp=1730737847~hmac=3a410cd6fa023f0262edddb8260a21798c2f7701b2634dc0b1d80b5cb27a0321&w=740',
    favorito: true,
  },
];

const Favoritos = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemNome}>{item.nome}</Text>
        <Text style={styles.itemDetalhes}>
          {item.tipo} • {item.distancia}
        </Text>
        <Text style={styles.itemDetalhes}>
          {item.tempo ? `${item.tempo} • ` : ''}{item.status || item.preco}
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FAVORITOS</Text>
      <FlatList
        data={favoritos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Favoritos;
