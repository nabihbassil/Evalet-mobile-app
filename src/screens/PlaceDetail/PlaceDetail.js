import React, { Component } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import openMap from 'react-native-open-maps';

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait",
    isMapReady: false
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };


  render() {
    let desc = null;
    if(this.props.selectedPlace.description){
      desc=
    <Text style={styles.carDescription}>
            Description:
              {this.props.selectedPlace.description}
            </Text>

    }
    let queryParams = `${this.props.selectedPlace.location.latitude},${this.props.selectedPlace.location.longitude}`
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
      
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
              onLayout={this.onMapLayout}
            >
              {this.state.isMapReady &&
              <MapView.Marker 
              coordinate={this.props.selectedPlace.location} />
              }
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
            ID:
              {this.props.selectedPlace.name}
            </Text>
            {desc}
          </View>
          <View>
            <TouchableOpacity style={{margin:10}}
            onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="white"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{marginTop:5}}
            onPress={() => openMap({query:queryParams,provider: 'google', zoom:10})}>
            <View style={{backgroundColor:'#708085',borderRadius:30,padding:4,}}>
              <Text style={{fontSize:18,color:'white',padding:10,textAlign:"center"}}>Directions --></Text>
              </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    //backgroundColor:'#506065'
    backgroundColor:"#fffaf4"
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%",
    marginBottom:10
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  carDescription:{
    fontSize: 20,
    textAlign:"center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop:10
  },
  deleteButton: {
    backgroundColor:'#708085',
    alignItems: "center",
    borderRadius:30,
    padding:4
  },
  subContainer: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
