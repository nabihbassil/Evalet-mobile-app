import React, { Component } from "react";
import { Text,View, Image, Button, StyleSheet,TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import fillerImage from '../../assets/fillerImage.jpg'

class PickImage extends Component {
  state = {
    pickedImage: fillerImage
  }

  reset = () => {
    this.setState({
      pickedImage: fillerImage
    })
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image",maxWidth:600, maxHeight: 400}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        
          <TouchableOpacity onPress={this.pickImageHandler}>
          <View style={styles.button}><Text style={{color:"white",fontSize:16}}>Take or Pick Image</Text></View>
          </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
    },
    button: {
      padding:8,
      margin: 7,
      backgroundColor:"#708085",
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
  });

export default PickImage;
