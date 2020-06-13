import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  View,
} from "react-native";
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

import firebase from "../firebase";
import Loading from "../components/Loading";

const ResumenPedido = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const {
    pedido,
    total,
    mostrarResumen,
    eliminarProducto,
    pedidoOrdenado,
  } = useContext(PedidoContext);

  const navigation = useNavigation();

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

  const progresoPedido = () => {
    Alert.alert(
      "Revisa tu pedido",
      "Una vez que realizas tu pedido no podrás cambiarlo",
      [
        {
          text: "Confirmar",
          onPress: async () => {
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now(),
            };

            try {
              setmodalVisible(true);
              const pedido = await firebase.db
                .collection("ordenes")
                .add(pedidoObj);
              pedidoOrdenado(pedido.id);
              setmodalVisible(false);
              navigation.navigate("ProgresoPedido");
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: "Revisar",
          style: "cancel",
        },
      ]
    );
  };

  const confirmarEliminacion = (id) => {
    Alert.alert(
      "Deseas eliminar este artículo??",
      "Una vez eliminado tu artículo no podrás recuperarlo",
      [
        {
          text: "Confirmar",
          onPress: () => {
            eliminarProducto(id);
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
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
                  <Button
                    full
                    danger
                    style={{ marginTop: 20 }}
                    onPress={() => confirmarEliminacion(id)}
                  >
                    <Text>Eliminar</Text>
                  </Button>
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
      <Loading visible={modalVisible} text="Cargando.." />

      <Footer>
        <FooterTab>
          <Button
            onPress={() => progresoPedido()}
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
