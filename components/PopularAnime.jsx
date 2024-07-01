import React from "react";
import { StyleSheet, Pressable, Image, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import Anime from "./Anime";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";

const AnimeItem = ({ result }) => {
  const isDarkMode = useColorScheme() === "dark";
  const id = result.id;
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    <Link href={`/${id}`} asChild>
      <Pressable style={styles.PopularContainer}>
        <Image
          style={styles.backImage}
          source={{ uri: result.cover }}
          blurRadius={1}
        />
        <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(255,255,255,0)", "rgba(40,41,41,1)", "rgba(0,0,0,0.8)","rgba(0,0,0,1)",]
                  : [
                      "rgba(255,255,255,0)",
                      "rgba(255,255,255,1)",
                      "rgba(255,255,255,1)",
                    ]
              }
              style={{
                position: "absolute",
                top: 20,
                left: 0,
                right: 0,
                height: 400,
              }}
            />
        <Anime result={result} isLink={true} />
        <View style={styles.Info}>
          <Text style={styles.TitleText}>
            {result.title.english || result.title.romaji || "N/A"}
          </Text>
          <View style={styles.episodeInfo}>
            <Text style={styles.Episodes}>{result.totalEpisodes || "N/A"}</Text>
            <Text style={styles.EpisodesText}>Episodes</Text>
          </View>
        </View>
        
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  PopularContainer: {
    backgroundColor: "red",
    width: "100%",
    height: 180,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "hidden",
    gap: 10,
  },
  backImage: {
    width:'100%',
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    left: 0,
  },
  Info: {
    width: 150,
    height: 100,
    justifyContent: "flex-end",
    marginTop: 30,
    gap: 10,
    backgroundColor: "transparent",
  },
  TitleText: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "white",
  },
  episodeInfo: {
    flexDirection: "row",
    width: 100,
    height: 20,
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    transform: "translateX(-4px)",
  },
  EpisodesText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: "grey",
  },
  Episodes: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: "white",
  },
});

export default AnimeItem;
