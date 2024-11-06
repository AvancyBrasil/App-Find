import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Cor de fundo branca
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000', // Cor do texto para preto
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Cor da borda inferior em cinza claro
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Texto em preto para melhor contraste
  },
  itemDetalhes: {
    fontSize: 14,
    color: '#666', // Detalhes em cinza escuro para contraste
    marginTop: 4,
  },
});

export default styles;
