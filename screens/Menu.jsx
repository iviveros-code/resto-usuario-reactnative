import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import FirebaseContext from "../context/firebase/firebaseContext";

const Menu = () => {
  const { obtenerProductos } = useContext(FirebaseContext);

  useEffect(() => {
    obtenerProductos();
  }, []);
  return (
    <View>
      <Text> Menu Screen</Text>
    </View>
  );
};

export default Menu;
