import React, { useState, useEffect } from 'react';
import { styles, stylesProdutos } from './styles.js';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Categorias() {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('Toda a Find');
    const [searchText, setSearchText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedAdditionalCategory, setSelectedAdditionalCategory] = useState('Lojas');
    const [filteredStores, setFilteredStores] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [storesResponse, productsResponse] = await Promise.all([
                    fetch('http://192.168.15.10:4000/lojistas/'),
                    fetch('http://192.168.15.10:4000/produtos/')
                ]);
                const [storesData, productsData] = await Promise.all([
                    storesResponse.json(),
                    productsResponse.json()
                ]);
                setStores(storesData);
                setProducts(productsData);
                filterItems(selectedCategory);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
        setShowDropdown(false);
        filterItems(category);
    };

    const filterItems = (category) => {
        if (selectedAdditionalCategory === 'Lojas') {
            const storesFiltered = category === 'Toda a Find'
                ? stores.filter(store => store.nomeEmpresa.toLowerCase().includes(searchText.toLowerCase()))
                : stores.filter(store => store.categoria === category && store.nomeEmpresa.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredStores(storesFiltered);
        } else {
            const productsFiltered = products.filter(product =>
                product.nome.toLowerCase().includes(searchText.toLowerCase())
            );

            const storesWithProducts = stores.filter(store => {
                return (
                    (selectedCategory === 'Toda a Find' || store.categoria === selectedCategory) &&
                    productsFiltered.some(product => product.idLojista === store.id)
                );
            }).map(store => ({
                ...store,
                produtos: productsFiltered.filter(product => product.idLojista === store.id)
            })).filter(store => store.produtos.length > 0);

            setFilteredProducts(storesWithProducts);
        }
    };

    useEffect(() => {
        filterItems(selectedCategory);
    }, [searchText, selectedCategory, selectedAdditionalCategory]);

    const toggleFavorite = (storeId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(storeId)
                ? prevFavorites.filter(id => id !== storeId)
                : [...prevFavorites, storeId]
        );
    };

    const categories = [
        'Toda a Find', 'Doces e Salgados', 'Roupas', 'Farmácia', 'Casa', 'Livros',
        'Jogos', 'Brinquedo', 'Esporte', 'Techs', 'Veículos', 'Plantas', 'Pets',
    ];

    const additionalCategories = ['Lojas', 'Produtos'];

    return (
        <ScrollView style={styles.background}>
            <Text style={styles.searchLabel}>Buscar</Text>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#d9d9d9" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    placeholder={`Buscar em ${selectedCategory}`}
                    placeholderTextColor="#888"
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearIcon}>
                        <Icon name="times" size={20} color="#d9d9d9" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.selectContainer} onPress={() => setShowDropdown(!showDropdown)}>
                    <Text style={styles.selectText}>{selectedCategory}</Text>
                    <Icon name={showDropdown ? "chevron-up" : "chevron-down"} size={15} color="#d9d9d9" />
                </TouchableOpacity>

                <View style={styles.additionalCategoriesContainer}>
                    {additionalCategories.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setSelectedAdditionalCategory(item)}
                            style={[styles.cardCategorias, selectedAdditionalCategory === item && styles.selectedCategory]}
                        >
                            <Text style={[styles.textCard, selectedAdditionalCategory === item && styles.selectedText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {categories.map((category) => (
                        <TouchableOpacity key={category} onPress={() => handleCategoryPress(category)} style={styles.dropdownItem}>
                            <Text style={styles.dropdownText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {selectedAdditionalCategory === 'Lojas' ? (
                <View style={styles.storeContainer}>
                    <Text style={styles.searchLabel}>Lojas Encontradas:</Text>
                    <FlatList
    data={filteredStores}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity
            style={[styles.lojaAvaliacaoContainer, { marginRight: 10 }]}
            onPress={() => {
                console.log('Navegando para Lojista com ID:', item.id);
                navigation.navigate('Lojista', { lojistaId: item.id });
            }}
        >
            <View style={styles.storeItem}>
                <Image source={{ uri: item.imagemLojista }} style={styles.storeImage} />
                <View style={styles.storeDetails}>
                    <Text style={styles.storeName}>{item.nomeEmpresa}</Text>
                    <Text style={styles.storeRating}>Avaliação: {item.avaliacao}</Text>
                    <Text style={styles.storeDistance}>Distância: {/* Calcula a distância se necessário */}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
                    <Icon name={favorites.includes(item.id) ? "heart" : "heart-o"} size={20} color={favorites.includes(item.id) ? "#FF0000" : "#d9d9d9"} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )}
/>

                </View>
            ) : (
                <View style={stylesProdutos.productContainer}>
                    <Text style={styles.searchLabel}>Produtos Encontrados:</Text>
                    {filteredProducts.length > 0 && (
                        <FlatList
                            data={filteredProducts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.productContainer}>
                                    <View style={stylesProdutos.storeDetails}>
                                        <View style={stylesProdutos.storeItem}>
                                            <Image source={{ uri: item.imagemLojista }} style={stylesProdutos.storeImage} />
                                        </View>
                                        <View style={stylesProdutos.storeDetails2}>
                                            <Text style={stylesProdutos.storeName}>{item.nomeEmpresa}</Text>
                                            <View style={stylesProdutos.storeDetailsRow}>
                                                <View style={stylesProdutos.storeDetailsRow2}>
                                                    <Text style={stylesProdutos.storeRating}>Avaliação: {item.avaliacao}</Text>
                                                    <Text style={stylesProdutos.storeDistance}>Distância: {/* Calcula a distância se necessário */}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={stylesProdutos.favoriteButton}>
                                                    <Icon name={favorites.includes(item.id) ? "heart" : "heart-o"} size={20} color={favorites.includes(item.id) ? "#FF0000" : "#d9d9d9"} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={stylesProdutos.productListContainer}>
                                        <FlatList
                                            data={item.produtos}
                                            keyExtractor={(produto) => produto.id}
                                            renderItem={({ item: produto }) => (
                                                <View style={stylesProdutos.productItem}>
                                                    <Image source={{ uri: produto.imagemProduto }} style={stylesProdutos.productImage} />
                                                    <Text style={stylesProdutos.productName}>{produto.nome}</Text>
                                                    <Text style={stylesProdutos.productPrice}>R$ {produto.preco}</Text>
                                                </View>
                                            )}
                                            horizontal={true}
                                            contentContainerStyle={styles.productList}
                                        />
                                    </View>
                                    <View style={stylesProdutos.separator} />
                                </View>
                            )}
                        />
                    )}
                </View>
            )}

            <View style={{ height: 80 }} />
        </ScrollView>
    );
}
