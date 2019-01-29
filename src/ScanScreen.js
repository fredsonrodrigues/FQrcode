import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
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
          <View>
            <Text style={styles.buttonText}>{this.state.valor}</Text>
            <TouchableOpacity style={styles.buttonTouchable} onPress={this.reload.bind(this)}>
              <Text style={styles.buttonText}>Re-scanner</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/1.5
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
    color: '#222',
  },
  buttonTouchable: {
    padding: 16,
  },
});