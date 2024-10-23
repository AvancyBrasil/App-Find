import React from 'react';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Catrgorias() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.background}>
            {/* Barra de pesquisa */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar"
                    placeholderTextColor="#888"
                />
            </View>

            {/* Barra de pesquisa e ícone */}
            <View style={styles.container}>
                <View style={styles.containerCategorias}>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Doces e Salgados</Text>
                        <Image source={require('../../assets/imagensCategorias/brigadeiro.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Roupas</Text>
                        <Image source={require('../../assets/imagensCategorias/roupa.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                </View>

                <View style={styles.containerCategorias}>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Farmácia</Text>
                        <Image source={require('../../assets/imagensCategorias/remedio.webp')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Casa</Text>
                        <Image source={require('../../assets/imagensCategorias/sofa.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                </View>

                <View style={styles.containerCategorias}>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Livros</Text>
                        <Image source={require('../../assets/imagensCategorias/livro.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Jogos</Text>
                        <Image source={require('../../assets/imagensCategorias/controle.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                </View>

                <View style={styles.containerCategorias}>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Brinquedo</Text>
                        <Image source={require('../../assets/imagensCategorias/urso.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Esporte</Text>
                        <Image source={require('../../assets/imagensCategorias/bola.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                </View>

                <View style={styles.containerCategorias}>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Techs</Text>
                        <Image source={require('../../assets/imagensCategorias/celular.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Veículos</Text>
                        <Image source={require('../../assets/imagensCategorias/carro.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                </View>

                <View style={styles.containerCategorias}>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Plantas</Text>
                        <Image source={require('../../assets/imagensCategorias/planta.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                    <View style={styles.cardCategorias}>
                        <Text style={styles.textCard}>Pets</Text>
                        <Image source={require('../../assets/imagensCategorias/pets.png')} style={styles.image} alt="Sua Empresa"/>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}