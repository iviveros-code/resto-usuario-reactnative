import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DetallePlato from "./screens/DetallePlato";
import FormularioPlato from "./screens/FormularioPlato";
import Menu from "./screens/Menu";
import NuevaOrden from "./screens/NuevaOrden";
import ProgresoPedido from "./screens/ProgresoPedido";
import ResumenPedido from "./screens/ResumenPedido";

import BotonResumen from "./components/UI/BotonResumen";

import FirebaseState from "./context/firebase/firebaseState";
import PedidoState from "./context/pedidos/pedidoState";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#FFDA00" },
                headerTitleStyle: { fontWeight: "bold" },
                headerTintColor: "#000",
              }}
            >
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{ title: "Nueva Orden" }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: "Nuestro Menú ",
                  headerRight: (props) => <BotonResumen />,
                }}
              />
              <Stack.Screen
                name="DetallePlato"
                component={DetallePlato}
                options={{ title: "Detalle Orden" }}
              />
              <Stack.Screen
                name="FormularioPlato"
                component={FormularioPlato}
                options={{ title: " Ordenar Plato" }}
              />
              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{ title: "Resumen Orden" }}
              />
              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{ title: "Progreso Orden" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
