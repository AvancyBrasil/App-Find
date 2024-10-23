import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f5f5f5', // Cor de fundo clara
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Centraliza o título
    color: '#333', // Cor do texto do título
  },
  listContainer: {
    alignItems: 'center', // Centraliza os itens da lista
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '45%', // Largura do cartão
  },
  storeInfo: {
    alignItems: 'center', // Centraliza a informação da loja
  },
  storeImageLoja: {
    width: '100%',
    height: 100, // Altura fixa para a imagem da loja
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o título da loja
    color: '#555', // Cor do texto da loja
  },
  distanceText: {
    fontSize: 14,
    color: '#777', // Cor do texto da distância
    marginTop: 4,
  },
  cardImage: {
    width: '100%',
    height: 120, // Altura fixa para a imagem do produto
    borderRadius: 8,
    marginTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
    paddingTop: hp('2.5%'),
    backgroundColor: '#050521', // Azul de fundo
    
  },
});

export default styles;
