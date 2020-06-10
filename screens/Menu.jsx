import React, { useContext, useEffect, Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from "native-base";
import globalStyles from "../styles/global";
import FirebaseContext from "../context/firebase/firebaseContext";
import PedidoContext from "../context/pedidos/pedidoContext";

const Menu = () => {
  const { menu, obtenerProductos } = useContext(FirebaseContext);

  const navigation = useNavigation();

  const { seleccionarPlato } = useContext(PedidoContext);
  useEffect(() => {
    obtenerProductos();
    // console.log(menu);
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      );
    }
  };
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{ backgroundColor: "#fff" }}>
        <List>
          {menu.map((plato, i) => {
            const {
              imagen,
              nombre,
              descripcion,
              categoria,
              id,
              precio,
            } = plato;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() => {
                    const { existencia, ...plato2 } = plato;
                    seleccionarPlato(plato2);
                    navigation.navigate("DetallePlato");
                  }}
                >
                  <Thumbnail source={{ uri: imagen }} large />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text note>{descripcion}</Text>
                    <Text> Precio: ${precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Menu;

const styles = StyleSheet.create({
  separador: {
    backgroundColor: "#000",
  },
  separadorTexto: {
    color: "#FFDA00",
    fontWeight: "bold",
  },
});
