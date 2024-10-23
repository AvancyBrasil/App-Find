import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050521',
  },
  fullContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Ajustado para iniciar o conteúdo no topo
    backgroundColor: '#050521',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('5%'), // Adiciona padding no topo para evitar rolagem
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('5%'), // Ajustado para espaçamento abaixo do logo
    padding: wp('2%'),
  },
  logo: {
    height: hp('25%'), // Reduzido para ajustar o espaço
    width: wp('50%'),  // Reduzido para ajustar o espaço
  },
  formContainer: {
    flex: 1, // Ajustado para ocupar o espaço disponível
    padding: wp('5%'), // Ajustado para % da largura
    marginBottom: hp('5%'), // Ajustado para espaçamento na parte inferior
    justifyContent: 'flex-start', // Alinha o conteúdo no topo
  },
  inputContainer: {
    marginBottom: hp('1.5%'), // Ajustado para % da altura
    justifyContent: 'center',
  },
  label: {
    fontSize: wp('4%'), // Ajustado para % da largura
    color: '#FFFFFF',
    marginBottom: hp('0.75%'), // Ajustado para % da altura
    marginTop: hp('1%'), // Ajustado para % da altura
  },
  input: {
    height: hp('6%'), // Ajustado para % da altura
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: wp('2%'), // Ajustado para % da largura
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
  },
  button: {
    marginTop: hp('2%'), // Ajustado para % da altura
    backgroundColor: '#FF5800',
    padding: hp('1.5%'), // Ajustado para % da altura
    borderRadius: wp('2%'), // Ajustado para % da largura
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4.5%'), // Ajustado para % da largura
    fontWeight: 'bold',
  },
});

export default styles;
