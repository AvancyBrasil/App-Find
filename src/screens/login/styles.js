import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050521',
  },
  fullContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Garantir que o conteúdo esteja centralizado
    backgroundColor: '#050521', // Mesmo background para eliminar qualquer espaço branco
    paddingHorizontal: wp('5%'), // Adiciona padding nas laterais para responsividade
  },
  
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: wp('2.5%'), // Ajustando para 10px
    top: '50%',
    transform: [{ translateY: -hp('1.5%') }], // Ajustando para -12px
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: hp('12%'), // Ajustando para 100px
    marginBottom: hp('-6%'), // Ajustando para -50px
    padding: wp('1.2%'), // Ajustando para 5px
  },
  logo: {
    height: wp('62.5%'), // Ajustando para 250px
    width: wp('62.5%'), // Ajustando para 250px
  },
  title: {
    marginTop: hp('-2.5%'), // Ajustando para -20px
    fontSize: wp('5%'), // Ajustando para 20px
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formContainer: {
    flex: 2,
    padding: wp('12%'), // Ajustando para 50px
    marginBottom: hp('5%'), // Ajustando para 40px
    marginTop: hp('2.5%'), // Ajustando para 20px
    justifyContent: 'center',
    backgroundColor: '#050521'
  },
  fullcontainer: {
    backgroundColor: '#050521',
  },
  inputContainer: {
    marginBottom: hp('1.5%'), // Ajustando para 12px
    justifyContent: 'center',
  },
  label: {
    fontSize: wp('3.5%'), // Ajustando para 14px
    color: '#FFFFFF',
    marginBottom: hp('0.75%'), // Ajustando para 6px
  },
  input: {
    height: hp('5%'), // Ajustando para 40px
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: wp('1%'), // Ajustando para 4px
    paddingHorizontal: wp('2.5%'), // Ajustando para 10px
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    fontSize: wp('3%'), // Ajustando para 12px
    color: '#FFFFFF',
  },
  button: {
    marginTop: hp('2.5%'), // Ajustando para 20px
    backgroundColor: '#FF5800',
    padding: hp('1.5%'), // Ajustando para 12px
    borderRadius: wp('1%'), // Ajustando para 4px
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'), // Ajustando para 16px
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: hp('2.5%'), // Ajustando para 20px
    textAlign: 'center',
    fontSize: wp('3.5%'), // Ajustando para 14px
    color: 'lightblue',
  },
  footerLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default styles;
