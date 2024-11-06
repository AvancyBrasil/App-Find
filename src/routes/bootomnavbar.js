import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones modernos
import Home from '../screens/home';
import Chat from '../screens/chat';
import Favoritos from '../screens/favoritos';
import Categorias from '../screens/categorias';
import PerfilCliente from '../screens/perfilcliente'; // Certifique-se de que o caminho está correto
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function Bottomnav() {
  const userData = useSelector((state) => state.user.userData);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Cor de fundo da barra de navegação (branco)
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          position: 'absolute', // Mantém a barra de navegação na parte inferior
        },
        tabBarActiveTintColor: '#FF5800', // Cor para ícones ativos
        tabBarInactiveTintColor: '#000000', // Cor para ícones inativos (preto)
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho da fonte das labels dos ícones
          textAlign: 'center', // Centraliza as labels
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen
        name="Busca"
        component={Categorias}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Busca',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} /> // Ícone de coração
          ),
          tabBarLabel: 'Favoritos', // Rótulo da aba
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilCliente}
        initialParams={{
          id: userData && userData.length > 0 ? userData[0].id : null,
          email: userData && userData.length > 0 ? userData[0].email : null,
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
