import React, { useReducer } from "react";

import PedidoReducer from "./pedidoReducer";
import PedidoContext from "./pedidoContext";
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATO,
  MOSTRAR_RESUMEN,
} from "../../types";

const PedidoState = (props) => {
  const initialState = {
    pedido: [],
    plato: null,
    total: 0,
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

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        plato: state.plato,
        total: state.total,
        seleccionarPlato,
        guardarPedido,
        mostrarResumen,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
