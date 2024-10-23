import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'; // Importa o Provider do Redux
import store from './src/redux/store'; // Importa o store configurado
import Route from "./src/routes/index";

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Route />
    </NavigationContainer>
     </Provider>
  );
}
