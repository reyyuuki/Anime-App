import React from "react";
import { StyleSheet , Image, useColorScheme} from "react-native";
import { Text, View } from '@/components/Themed';

const Episodes = ({result}) => {
    const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.EpisodeContainer, {backgroundColor: isDarkMode? "#1f1d1d": 'white'}]}>
      <Image style={styles.EpisodeImage} source={{ uri: result.image}} />
      <View style={styles.EpisodeNumber}>
        <Text style={styles.EpisodeNumberText}>{result.number}</Text>
      </View>
      <Text style={styles.EpisodeName}>{result.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EpisodeContainer: {
    flexDirection: "row",
    padding: 10,
    width: "95%",
    alignItems: "center",
    height: 120,
    borderRadius: 25,
    overflow: "hidden",
    marginLeft:-5
  },
  EpisodeImage: {
    width: 180,
    height: 120,
    borderRadius: 20,
    backgroundColor: "green",
    marginLeft: -10,
  },
  EpisodeNumber: {
    backgroundColor: "white",
    width: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    position: "absolute",
    top: -3,
   
  },
  EpisodeNumberText: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color:'black',
    marginTop:5
  },
  EpisodeName: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    width: 130,
    marginLeft: 10,
  },
});

export default Episodes;
