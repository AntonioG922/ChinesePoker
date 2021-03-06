import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import store from '../redux/store';

export default function PopUpMessage({ showPopUp, exitAction, exitMessage, confirmAction, confirmMessage, children }) {
  const [font, setFont] = useState(store.getState().globalFont);

  useEffect(() => {
    return store.subscribe(() => {
      const storeFont = store.getState().globalFont;
      setFont(storeFont);
    })
  }, []);

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000040'
    },
    messageContainer: {
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    displayMessage: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 100,
      minWidth: 275,
      padding: 25
    },
    buttons: {
      flexDirection: 'row'
    },
    button: {
      flex: 1,
      alignItems: 'center',
      padding: 15
    },
    exitButton: {
      backgroundColor: 'rgb(217, 56, 27)',
      borderBottomLeftRadius: 5
    },
    confirmButton: {
      backgroundColor: 'rgb(80, 189, 68)',
      borderBottomRightRadius: 5
    },
    buttonText: {
      fontFamily: font,
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
    }
  })

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      onRequestClose={() => showPopUp = false}
      visible={showPopUp}
    >
      <View style={styles.modalBackground}>
        <View style={styles.messageContainer}>
          <View style={styles.displayMessage}>
            {children}
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight underlayColor='rgb(150, 56, 27)' style={[styles.button, styles.exitButton]} onPress={() => exitAction()} >
              <Text style={styles.buttonText}>{exitMessage}</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='rgb(80, 120, 68)' style={[styles.button, styles.confirmButton]} onPress={() => confirmAction()} >
              <Text style={styles.buttonText}>{confirmMessage}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}
