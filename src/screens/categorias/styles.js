import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#ffffff',
    },
    searchContainer: {
        marginTop: 50,
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
    },
    searchIcon: {
        position: 'absolute',
        left: 25,
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        height: 45,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingLeft: 50,
        color: '#333',
        fontSize: 14,
    },
    clearIcon: {
        position: 'absolute',
        right: 25,
        zIndex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        width: '30%',
    },
    selectText: {
        color: '#333',
        fontSize: 18,
        flex: 1,
        marginLeft: 20,
    },
    additionalCategoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '43.5%',
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
        marginRight: 10,
    },
    dropdown: {
        position: 'absolute',
        top: 190,
        left: 10,
        right: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 5,
        zIndex: 1,
        width: '30%',
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownText: {
        color: '#333',
    },
    cardCategorias: {
        backgroundColor: 'transparent',
        height: 35,
        width: 80,
        margin: 5,
        borderRadius: 30,
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
    textCard: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    selectedCategory: {
        backgroundColor: '#4a90e2',
    },
    selectedText: {
        color: '#FFFFFF',
    },
    searchLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
    storeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
    },
    storeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    storeDetails: {
        flex: 1,
    },
    storeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    storeRating: {
        fontSize: 14,
        color: '#555',
    },
    storeDistance: {
        fontSize: 14,
        color: '#555',
    },
    favoriteButton: {
        marginTop: 5,
    },
});

const stylesProdutos = StyleSheet.create({
    productContainer: {
        flex: 1,
        marginBottom: 15, // Espaçamento inferior entre cada loja
        backgroundColor: '#fff', // Fundo branco para o contêiner da loja
        borderRadius: 8, // Bordas arredondadas
        elevation: 2, // Sombra para dar destaque
        padding: 10, // Espaçamento interno
    },
    storeDetails: {
        flexDirection: 'row', // Alinha a imagem e os detalhes da loja em linha
        alignItems: 'center', // Centraliza verticalmente
    },
    storeItem: {
        marginRight: 10, // Espaçamento à direita da imagem da loja
    },
    storeImage: {
        width: 50,
        height: 50,
        borderRadius: 30, // Canto arredondado para a imagem da loja
    },
    storeDetails2: {
        flex: 1, // Permite que os detalhes ocupem o espaço restante
    },
    storeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    storeDetailsRow: {
        flexDirection: 'row', // Alinha avaliação, distância e botão em linha
        justifyContent: 'space-between', // Espaço entre os textos e o botão
        alignItems: 'center', // Alinha verticalmente
    },
    storeDetailsRow2: {
        flexDirection: 'row', // Alinha avaliação e distância em linha
        justifyContent: 'flex-start', // Alinha à esquerda
        alignItems: 'center', // Alinha verticalmente
    },
    storeRating: {
        fontSize: 11,
        color: '#555',
        marginRight: 10, // Espaçamento à direita
    },
    storeDistance: {
        fontSize: 11,
        color: '#555',
    },
    productListContainer: {
        marginTop: 10, // Espaçamento entre a loja e a lista de produtos
    },
    productItem: {
        width: 100,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        elevation: 1,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 12,
        color: '#FF5800',
        marginTop: 3,
        textAlign: 'center',
    },
    favoriteButton: {
        marginLeft: 10, // Espaçamento à esquerda do botão de favoritos
    },
    separator: {
        height: 1, // Altura da linha
        backgroundColor: '#d9d9d9', // Cor da linha
        marginVertical: 20, // Espaçamento vertical
    },
});




export { styles, stylesProdutos };
