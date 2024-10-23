import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    logoContainer: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: 100,
      marginBottom: 20,
      padding: 5, 
    },
    logo: {
      height: 250,
      width: 250,
    },
    title: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    subtitle:{
        marginTop: 5,
      fontSize: 13,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    formContainer: {
      flex: 2,
      padding: 50, 
      marginBottom:40,
      marginTop: 20,
      justifyContent: 'center',
    },
    inputContainer: {
      marginBottom: 12,
      justifyContent: 'center',
    },
    label: {
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: 6,
      marginTop: 10,
    },
    input: {
  
      height: 40,
      borderColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    passwordContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    forgotPassword: {
      fontSize: 12,
      color: '#FFFFFF',
    },
    button: {
      marginTop: 20,
      backgroundColor: '#4F46E5',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    footerText: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 14,
      color: 'lightblue',
    },
    footerLink: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });

  export default styles;
  