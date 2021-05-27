import React from "react"
import {Text,View, TouchableOpacity, StyleSheet , Image} from "react-native"
import {BarCodeScanner} from "expo-barcode-scanner"
import * as Permissions from "expo-permissions"

export default class BookTransaction extends React.Component
{

constructor(){
super();
this.state={
hasCameraPermissions:null,
scanned:false,
scannedData:"",
buttonState:"normal"
}}

getCameraPermissions=async()=>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA)
this.setState({
 hasCameraPermissions:status==="granted" ,
 buttonState:"clicked",
 scanned:false
})


}

handlebarcodescan=async({type,data})=>{
  this.setState({
    scanned:true,
    scannedData:data,
    buttonState:"normal"
  })




}



render(){

const hasCameraPermissions=this.state.hasCameraPermissions
const scanned=this.state.scanned
const buttonState=this.state.buttonState

if(buttonState==="clicked"&& hasCameraPermissions){
  return(
    <BarCodeScanner
    onBarCodeScanned={scanned ? undefined : this.handlebarcodescan}
style={StyleSheet.absoluteFillObject}

    />
  )
}



else if( buttonState==="normal"){  
return(
<View style={{flex:1,justifyContent:"center", alignItems:"center"  , backgroundColor:"red" }} >

<Text>
{hasCameraPermissions===true ? this.state.scannedData : "request camera permission"}
</Text>


<TouchableOpacity style={{backgroundColor:"green",width:100,padding:10,borderRadius:20, alignItems:"center"}} 
onPress={this.getCameraPermissions}
 >
<Text>
scan QR code
</Text>
</TouchableOpacity>

<Image  source={require("../screens/bar.jpg")}
style={{width:100,height:100}}  />


</View>



)


}

}

}