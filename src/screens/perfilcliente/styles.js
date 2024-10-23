import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
    paddingTop: hp('2.5%'),
    backgroundColor: '#050521', // Azul de fundo
  },
  logo: {
    width: wp('31.25%'),
    height: hp('9.38%'),
    resizeMode: 'contain',
  },
  iconButton: {
    marginLeft: wp('50%'),
  },
  inputArea: {
    flexDirection:'row',
    width:'100%',
    backgroundColor:'2A2A2A',
    height: 60,
    alignItems:'center',
    borderRadius: 5,
  },

  //começo do perfil
  background: {
    backgroundColor: '#050521',
    flex: 1,
  },
  containerPerfil: {
    alignItems: 'center',
    marginVertical: hp('2.5%'),
  },
  titleText: {
    fontSize: hp('3%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  foto: {
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: wp('15%'),
    marginBottom: hp('1%'),
  },
  nameText: {
    fontSize: hp('2.5%'),
    color: '#FF8500',
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  bioText: {
    fontSize: hp('2%'),
    color: '#A9A9A9',
  },

logoutContainer: {
    alignItems: 'center',
    marginRight: hp('3%'),
    marginTop: hp('0.5'),
  },
  logoutButton: {
    backgroundColor: '#FF5800',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: wp('2%'),
    fontWeight: 'bold',
  },

  // Informação Pessoal e Conta
  containerInfo: {
    marginVertical: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },
  infoPessoal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.25%'),
  },
  textInfoCont: {
    fontSize: hp('2.5%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textInfoCont2: {
    fontSize: hp('2.5%'),
    color: '#D9D9D9',
    fontWeight: 'bold',
  },
  textInfoCont3: {
    fontSize: hp('2.5%'),
    color: '#FF8500',
    fontWeight: 'bold',
  },
  containerCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: wp('2%'),
    padding: wp('3%'),
  },
  cardInfo: {
    marginBottom: hp('1%'),
  },
  firstCard: {
    marginTop: hp('1%'),
  },
  lastCard: {
    marginBottom: 0,
  },
  textInfo: {
    fontSize: hp('2%'),
    color: '#FFFFFF',
    marginBottom: hp('0.5%'),
  },
  textInfo2: {
    fontSize: hp('2%'),
    color: '#808080',
    marginBottom: hp('0.5%'),
  },
  textInput: {
    backgroundColor: '#2A2A2A',
    color: '#ffffff',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1.25%'),
    fontSize: hp('2%'),
    flex: 1,
    width: '100%',
  },

  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('2.5%'),
  },

  textInfoCont2: {
    fontSize: hp('2.5%'),
    color: '#D9D9D9',
    fontWeight: 'bold',
  },

  textInfoCont3: {
    fontSize: hp('2.5%'),
    color: '#FF8500',
    fontWeight: 'bold',
  },

  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinhamento dos botões
    marginVertical: hp('2.5%'),
  },

  confirmButton: {
    backgroundColor: '#FF4500', // Verde
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },

  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },

  cancelButton: {
    backgroundColor: '#1E1E1E', // Vermelho
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },

  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },

  deleteButton: {
    backgroundColor: 'transparent', // Fundo transparente
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    marginTop: hp('2%'), // Margem para separar dos botões anteriores
  },

  deleteText: {
    fontSize: hp('2%'),
    color: '#FF4500', // Vermelho discreto
    fontWeight: '500', // Peso médio
    textDecorationLine: 'underline', // Sublinhado para indicar ação
  },
});

export default styles;