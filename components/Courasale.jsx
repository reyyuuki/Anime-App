import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Anime from "./Anime";
import { LinearGradient } from "expo-linear-gradient";

const Courasale = ({ result }) => {
  const id = result.id;
  const isDarkMode = useColorScheme() === "dark";
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const translateAnim = useRef(new Animated.Value(0)).current;
  const translateX = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-90, 90],
  });
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show a loading indicator while fonts are loading
  }

  return (
    <Link href={`/${id}`} asChild>
      <Pressable style={styles.carousel}>
        <View style={styles.backgroundContainer}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [{ translateX }],
            }}
          >
            <Animated.Image
              source={{ uri: result.cover }}
              style={styles.backgroundImage}
              blurRadius={2}
            />
            
          </Animated.View>
          <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(255,255,255,0)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"]
                  : [
                      "rgba(255,255,255,0)",
                      "rgba(255,255,255,1)",
                      "rgba(255,255,255,1)",
                    ]
              }
              style={{
                position: "absolute",
                top: 160,
                left: 0,
                right: 0,
                height: 400,
              }}
            />
        </View>
        <View style={styles.slidingAnime}>
          <Anime result={result} isLink={true} />
          <View style={styles.animeInfo}>
            <Text style={styles.slidingAnimeTitle}>
              {result.title.english || result.title.native || "N/A"}
            </Text>
            <Text style={styles.animeStatus}>{result.status}</Text>
            <View style={styles.genres}>
              {result.genres.map((result, i) =>
                i < 3 ? (
                  <Text style={styles.genre} key={i}>
                    {result} {i === 2 ? "" : " •"}
                  </Text>
                ) : null
              )}
            </View>
          </View>
          <View style={styles.episodeInfo}>
            <Text style={styles.TotalEpisodes}>
              {result.totalEpisodes || "N/A"}
            </Text>
            <Text style={styles.genre}> Episodes</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default Courasale;

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    transform: "scale(1.9)",
  },
  backgroundImage: {
    width: "200%",
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    width: 400,
    height: 500,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "hidden",
  },
  episodeInfo: {
    width: 100,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    left: 5,
    top: 213,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  genres: {
    width: 250,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    top: 190,
    right: -20,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  genre: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "grey",
  },
  slidingAnimeTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  slidingAnime: {
    backgroundColor: "transparent",
    width: 360,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 60,
    marginLeft: 30,
  },
  animeInfo: {
    marginLeft: 10,
    width: 200,
    height: 200,
    padding: 10,
    justifyContent: "flex-end",
    gap: 10,
    backgroundColor: "transparent",
  },
  contentContainer: {
    padding: 10,
  },
  animeStatus: {
    fontFamily: "Poppins_700Bold",
    color: "deeppink",
  },
});
