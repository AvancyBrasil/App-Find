import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#ffffff', // Cor de fundo branca
    padding: 20,
  },
  containerPerfil: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#000', // Cor do texto para preto
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000', // Cor da borda da imagem
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    color: '#000', // Cor do nome para preto
    fontWeight: 'bold',
  },
  containerInfo: {
    backgroundColor: '#f0f0f0', // Fundo da seção de informações
    borderRadius: 10,
    padding: 15,
  },
  infoPessoal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInfoCont: {
    fontSize: 18,
    color: '#000', // Cor do texto para preto
    fontWeight: 'bold',
  },
  containerCard: {
    marginVertical: 10,
  },
  cardInfo: {
    marginBottom: 10,
  },
  textInfo: {
    color: '#000', // Cor do texto para preto
    fontSize: 16,
  },
  textInfo2: {
    color: '#666', // Cor do texto secundário para cinza
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#ffffff', // Cor de fundo do input
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Cor da borda do input
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#666', // Preto um pouco mais claro
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FF5800', // Laranja
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textExcluirConta: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  firstCard: {
    marginTop: 0,
  },
  lastCard: {
    marginBottom: 0,
  },
  editIcon: {
    position: 'absolute',
    bottom: 1, // Distância do fundo da imagem
    right: -5, // Distância da direita da imagem
  },
  
  textSairConta: {
    color: '#FF5800',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign:'center',
  },
  
});

export default styles;
