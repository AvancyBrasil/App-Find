import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando a biblioteca de ícones
import Home from '../screens/home';
import Chat from '../screens/chat';
import Categorias from '../screens/categorias';
import Moments from '../screens/moments';

const Tab = createBottomTabNavigator();

export default function Bottomnav() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown:false, 
        tabBarStyle: {
          backgroundColor: '#050521', // Cor de fundo azul para a barra de navegação
        },
        tabBarActiveTintColor: '#FF5800', // Cor laranja para os ícones ativos
        tabBarInactiveTintColor: '#FFFFFF', // Cor laranja para os ícones inativos
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ userData: [] }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={Categorias}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="th" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Moments"
        component={Moments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="refresh" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
