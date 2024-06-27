import React from 'react';
import { View, Image, Text, StyleSheet, FlatList, useColorScheme } from 'react-native';

const Geners = ({genres}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const getImageUri = (name) => {
    switch (name) {
      case "Action":
        return "https://s4.anilist.co/file/anilistcdn/media/anime/banner/139518-OxLRGjPm9Tms.jpg";
      case "Adventure":
        return "https://s4.anilist.co/file/anilistcdn/media/anime/banner/170130-UfSdfrNR4BU8.jpg";
      case "Comedy":
        return "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg";
      case "Fantasy":
        return "https://s4.anilist.co/file/anilistcdn/media/anime/banner/166240-YdxoEhrfwNk0.jpg";
      case "Drama":
        return "https://s4.anilist.co/file/anilistcdn/media/anime/banner/158709-ZGCammGG4F9a.jpg";
      case "Psychological":
        return "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg";
      default:
        return "https://via.placeholder.com/150";
    }
  };

 

  return (
    <FlatList
    data={genres}
    keyExtractor={item => item.name}
    renderItem={({ item }) => (
      <View style={[styles.Generes, { borderColor: isDarkMode ? 'white' : 'black' }]}>
        <Image source={{ uri: getImageUri(item) }} style={styles.images} />
        <Text style={styles.text}>{item}</Text>
      </View>
    )}
    numColumns={2}
    columnWrapperStyle={styles.column}
    contentContainerStyle={styles.list}
  />
);
}

const styles = StyleSheet.create({
  Generes: {
    width: 150,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  images: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    position:'absolute'
  },
  list: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  column: {
    justifyContent: 'space-around',
  },
});

export default Geners;