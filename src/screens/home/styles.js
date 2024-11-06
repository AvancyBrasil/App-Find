import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  arrowButton: {
    padding: 5,
  },
  logradouroText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
  },
  arrowPlaceholder: {
    width: 24,
  },
  detailsContainer: {
    marginTop: 10,
    padding: 8, // Mantido o padding para uma boa estética
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  orangeText: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  lojaProximaContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Mantém os itens alinhados verticalmente
    padding: 10, // Mantém o padding, mas verifique se é necessário
  },
  lojaProximaImagem: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 10,
  },
  lojaProximaInfo: {
    flex: 1,
    justifyContent: 'center', // Para centralizar verticalmente os textos
  },
  lojaProximaNome: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
    marginBottom: 0, // Removido para evitar espaço extra
  },
  lojaProximaDistancia: {
    fontSize: 16,
    color: '#777',
    marginBottom: 0, // Removido para evitar espaço extra
  },
  lojaAvaliacaoContainer: {
    marginHorizontal: 10,
    width: 140,
    height: 180, // Defina uma altura fixa para evitar esticar demais
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden', // Para garantir que os conteúdos não extrapolem o card
    justifyContent: 'flex-start', // Para garantir que o conteúdo comece do topo
  },
  avaliacaoContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 10,
  },
  lojaAvaliacaoImagem: {
    width: '100%',
    height: 100, // Altura da imagem reduzida para evitar esticar demais
    borderRadius: 10,
    marginBottom: 5, // Ajuste conforme necessário
},
lojaAvaliacaoNome: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 2,
},
lojaAvaliacaoCategoria: {
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
},
lojaAvaliacaoDistancia: {
    fontSize: 12,
    color: '#000',
},


  cardPostagemContainer: {
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: '#050521', // Fundo mais escuro para contraste
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    overflow: 'hidden',
  },
  postagemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#050521', // Fundo contrastante para o cabeçalho
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  postagemLojistaImagem: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  postagemHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  postagemLojistaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  postagemDistancia: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 10,
  },
  postagemImagemProduto: {
    width: '100%',
    height: 250,
  },
  postagemInfo: {
    padding: 15,
    backgroundColor: '#050521',
  },
  postagemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postagemIcon: {
    fontSize: 16,
    color: '#FF6347', // Cor moderna e chamativa
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#222', // Fundo mais escuro para os ícones
    borderRadius: 20,
  },
  postagemCategoria: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  postagemPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 5,
  },
  postagemEspecificacao: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
});

export default styles;