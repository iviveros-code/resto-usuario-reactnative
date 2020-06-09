import React, { useReducer } from "react";

import PedidoReducer from "./pedidoReducer";
import PedidoContext from "./pedidoContext";

const PedidoState = (props) => {
  const initialState = {
    pedido: [],
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  return (
    <PedidoContext.Provider value={{ pedido: state.pedido }}>
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
