import React, { useReducer } from "react";

import PedidoReducer from "./pedidoReducer";
import PedidoContext from "./pedidoContext";
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from "../../types";

const PedidoState = (props) => {
  const initialState = {
    pedido: [],
    plato: null,
    total: 0,
    idpedido: "",
  };

  //useReducer  para ejecutar las funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  const seleccionarPlato = (plato) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: plato,
    });
  };
  //Cuando el usuario confirmar un plato

  const guardarPedido = (pedido) => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATO,
      payload: pedido,
    });
  };

  const mostrarResumen = (total) => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  const eliminarProducto = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

  const pedidoOrdenado = (id) => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        plato: state.plato,
        total: state.total,
        idpedido: state.idpedido,
        seleccionarPlato,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoOrdenado,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
