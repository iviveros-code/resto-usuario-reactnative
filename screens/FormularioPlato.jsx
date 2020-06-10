import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import PedidoContext from "../context/pedidos/pedidoContext";

import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Grid,
  Col,
  Button,
  Text,
  Footer,
  FooterTab,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";

const FormularioPlato = () => {
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);

  const { plato, guardarPedido } = useContext(PedidoContext);

  const { precio } = plato;

  const navigation = useNavigation();

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad);
    }
  };

  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad);
  };

  const confirmarOrden = () => {
    Alert.alert(
      "Desear confirmar tu pedido?",
      "Pedido confirmado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            const pedido = {
              ...plato,
              cantidad,
              total,
            };
            // console.log(pedido);
            guardarPedido(pedido);
            navigation.navigate("ResumenPedido");
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
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{ justifyContent: "center" }}
                onPress={() => decrementarUno()}
              >
                <Icon name="remove" style={{ fontSize: 30 }} />
              </Button>
            </Col>
            <Col>
              <Input
                style={{ textAlign: "center", fontSize: 20 }}
                value={cantidad.toString()}
                keyboardType="numeric"
                onChangeText={(cantidad) => setCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={{ justifyContent: "center" }}
                onPress={() => incrementarUno()}
              >
                <Icon name="add" style={{ fontSize: 30 }} />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPlato;
