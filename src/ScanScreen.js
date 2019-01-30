import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  Dimensions,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      valor: "Aponte para um Qrcode..",
      marker: true
    }
  }
  onSuccess(e) {
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    this.setState({valor: e.data, marker: false})
  }

  onLink(e) {
    Linking
      .openURL(this.state.valor)
      .catch(err => console.error('An error occured', err));
  }

  reload(){
    this.setState({ valor: "Aponte para um Qrcode..", marker: true })
    this.scanner.reactivate()
  }

  render() {
    return (
      <QRCodeScanner
        ref={(node) => { this.scanner = node }}
        cameraStyle={styles.camera}
        onRead={this.onSuccess.bind(this)}
        showMarker={this.state.marker}

        bottomContent={
          <View style={styles.super}>
            <View>
              <Text style={styles.buttonText}>{this.state.valor}</Text>
            </View>

            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <Button title="Re-scanner" style={styles.buttonTouchableLeft} onPress={this.reload.bind(this)}/>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Acessar" style={styles.buttonTouchableLeft} onPress={this.onLink.bind(this)} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Copiar" style={styles.buttonTouchableLeft} /*onPress={this.reload.bind(this)}*/ />
              </View>
            </View>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/1.15
  },
  super: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: '#222'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTouchableLeft: {
    backgroundColor: '#222',
    height: '100%'
  },
});