import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from "expo-permissions"
import {BarCodeScanner} from "expo-barcode-scanner"
export default class TransactionScreen extends React.Component {

  constructor(){
    super()
    this.state={
      hasCameraPermission: null,
      scanner: false,
      scanData: "",
      buttonState: "normal"
    }
  }

  getCameraPerms=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "click",
      scanner: false
    })
  }

  scanQRCode=async({data})=>{
    this.setState({
      scanner: true,
      scanData: data,
      buttonState: "normal" 
    })
  }

    render() {
      const hasCameraPermission = this.state.hasCameraPermission;
      const scanner = this.state.scanner;
      const buttonState = this.state.buttonState;
      if(buttonState==="click" && hasCameraPermission){
        return(
          <BarCodeScanner 
          onBarCodeScanned={
            scanner ? undefined :
            this.scanQRCode
          }
          style={StyleSheet.absoluteFill}/>

        )
      }
      else if(buttonState==="normal"){
        return (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center' 
          }}>

          <Text>{
            hasCameraPermission===true ?
            this.state.scanData : 
            "Request for Camera Permission"
          }</Text>
          <TouchableOpacity style={styles.qrButton} onPress={
            this.getCameraPerms
          }>
          <Text>Scan a QR Code</Text> 
          </TouchableOpacity>
        </View>
        )
      }
    }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  qrButton:{
    backgroundColor:"violet",
    margin: 10,
    padding: 15
  }})
  