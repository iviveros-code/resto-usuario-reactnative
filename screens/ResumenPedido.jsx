import React, { useEffect, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import PedidoContext from "../context/pedidos/pedidoContext";

const ResumenPedido = () => {
  const { pedido, total, mostrarResumen } = useContext(PedidoContext);

  const navigation = useNavigation();
  // console.log(pedido);
  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0
    );
    mostrarResumen(nuevoTotal);
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen del Pedido</H1>
        {pedido.map((plato, i) => {
          const { cantidad, nombre, imagen, id, precio } = plato;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large source={{ uri: imagen }} />
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: $ {precio}</Text>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.cantidad}>Total a pagar: ${total}</Text>
        <Button onPress={() => navigation.navigate("Menu")} full dark>
          <Text style={[globalStyles.botonTexto, { color: "#fff" }]}>
            Seguir Pidiendo
          </Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            onPress={() => navigation.navigate("ProgresoPedido")}
            style={[globalStyles.boton, { marginTop: 30 }]}
            full
          >
            <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;
