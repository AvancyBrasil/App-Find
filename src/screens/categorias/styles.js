import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#050521'
  },

  searchContainer: {
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: '#262938',
  },

  container: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
  },

  containerCategorias: {
    display: 'flex',
    flexDirection:'row',
  },

  cardCategorias: {
    backgroundColor: '#262938',
    height: 100,
    width: 170,
    margin:5,
    borderRadius:10,
    alignItems: 'center',
    display:'flex',
    flexDirection:'row',
  },

  textCard: {
    color:'#FFF',
    fontWeight: 'bold',
    fontSize: 21,
    marginLeft: 10
  },

  image: {
    height: 50,
    width: 50,
    marginLeft:5,
  },
  });

  export default styles;