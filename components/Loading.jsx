import React from "react";
import { View, Text, ActivityIndicator, Modal, StyleSheet } from "react-native";

const Loading = (props) => {
  const { visible, text } = props;
  return (
    <Modal style={styles.modal} transparent={true} visible={visible}>
      <View style={styles.view}>
        <ActivityIndicator
          size="large"
          color="#FF0042"
          style={{ marginBottom: 5 }}
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modal: {
    height: 100,
    width: 200,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: "black",
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 150,
  },
});

// export default function Loading(props) {
//   const { isVisible, text } = props;
//   return (
//     <Overlay
//       isVisible={isVisible}
//       windowBackgroundColor="rgba(0,0,0,.5)"
//       overlayBackgroundColor="transparent"
//       overlayStyle={styles.overlay}
//     >
//       <View style={styles.view}>
//         <ActivityIndicator size="large" color="#006a80" />
//         {text && <Text style={styles.text}>{text}</Text>}
//       </View>
//     </Overlay>
//   );
// }
