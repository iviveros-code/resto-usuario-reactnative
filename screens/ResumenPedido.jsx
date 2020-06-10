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
  const { pedido } = useContext(PedidoContext);

  console.log(pedido);
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen del Pedido</H1>
        {pedido.map((plato) => {
          const { cantidad, nombre, imagen, id, precio } = plato;
          return (
            <List key={id}>
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
        <Text style={globalStyles.cantidad}>Total a pagar: $</Text>
      </Content>
    </Container>
  );
};

export default ResumenPedido;
