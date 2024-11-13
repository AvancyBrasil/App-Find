import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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


export default PerfilLojista;