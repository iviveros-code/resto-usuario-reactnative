import React, { useReducer } from "react";

import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import firebase from "../../firebase";
import { OBTENER_PRODUCTOS_EXITO } from "../../types";

import _ from "lodash";

const FirebaseState = (props) => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const obtenerProductos = () => {};

  firebase.db
    .collection("productos")
    .where("existencia", "==", true)
    .onSnapshot(handleSnapshot);

  function handleSnapshot(snapshot) {
    let platos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    platos = _.sortBy(platos, "categoria");

    dispatch({
      type: OBTENER_PRODUCTOS_EXITO,
      payload: platos,
    });
  }

  return (
    <FirebaseContext.Provider
      value={{ menu: state.menu, firebase, obtenerProductos }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
