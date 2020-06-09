import React, { useReducer } from "react";

import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import firebase from "../../firebase";
import { OBTENER_PRODUCTOS } from "../../types";

const FirebaseState = (props) => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const obtenerProductos = () => {
    dispatch({
      type: OBTENER_PRODUCTOS,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{ menu: state.menu, firebase, obtenerProductos }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
