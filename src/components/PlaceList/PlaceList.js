import React from "react";
import { StyleSheet, FlatList,ScrollView } from "react-native";
import ListItem from "../ListItem/ListItem";

const placeList = props => {
  let searchTerms = props.searchTerms;
  let searchedArray = props.places.filter(item => {
    const itemData = `${item.name}`;
    const textData = searchTerms;
    return itemData.indexOf(textData) > -1;
  });

  return (
    <FlatList
      style={styles.listContainer}
      data={/*props.places*/searchedArray}
      renderItem={(info) => (
        <ListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          style={this.hidden===true?{width:20,height:0}:{}}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
        
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
