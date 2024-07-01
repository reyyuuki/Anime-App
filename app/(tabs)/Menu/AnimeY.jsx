import {
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  useColorScheme,
  Image,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { FontAwesome6 } from "@expo/vector-icons";
import Anime from "@/components/Anime";
import Courasale from "@/components/Courasale";
import React, { useState, useEffect } from "react";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Loader from "../../../components/Loader";
import { Link } from "expo-router";
import AnimeItem from "../../../components/PopularAnime";
import Btn from "../../../components/btn";

export default function TabOneScreen() {
 
  const [fontloaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const darkmode = useColorScheme() === "dark";
  const [AnimeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [GenersImage, setGenersImage] = useState("");
  const [CalanderImage, setCalanderImage] = useState("");
  const [AdvancedSearch, setAdvancedSearch] = useState([]);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/trending"
        );
        const result = await response.json();

        const response2 = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/advanced-search"
        );
        const search = await response2.json();

        if (search.results && search.results.length > 0) {
          setAdvancedSearch(search.results);
        }

        if (result.results && result.results.length > 0) {
          setAnimeList(result.results);
          setCalanderImage(result.results[4].cover);
          setGenersImage(result.results[9].cover);
        }
      } catch (error) {
        console.error("Error fetching trending anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingAnime();
  }, [loading]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Link href={"/SearchPage"} asChild>
            <Pressable
              style={{
                ...styles.Search,
                backgroundColor: darkmode
                  ? "rgba(0,0,0,0.4)"
                  : "rgba(255,255,255,0.4)",
              }}
            >
              <Text style={styles.SearchText}>Anime</Text>
              <FontAwesome6 name="magnifying-glass" style={styles.icon} />
            </Pressable>
          </Link>

          <View style={styles.Profile}>
            <Image
              style={styles.ProfileImage}
              source={require("../../../assets/images/Catgirl.jpg")}
            />
          </View>
         <Btn/>
          <View style={styles.slider}>
            {!loading ? (
              <FlatList
                horizontal
                data={AnimeList}
                renderItem={({ item }) => <Courasale result={item} />}
                keyExtractor={(item) => item.id.toString() || index.toString()}
                snapToAlignment="center"
                decelerationRate="fast"
                pagingEnabled
              />
            ) : (
              <Loader />
            )}
          </View>
          <View style={styles.TypeContainer}>
            <Pressable style={styles.GenresBtn}>
              {CalanderImage != "" ? (
                <Image
                  source={{ uri: GenersImage }}
                  style={styles.calendarImage}
                  resizeMode="cover"
                />
              ) : (
                <Loader/>
              )}
              <Text style={styles.GenresText}>Genres</Text>
            </Pressable>
            <Pressable style={styles.GenresBtn}>
              {CalanderImage != "" ? (
                <Image
                  source={{ uri: CalanderImage }}
                  style={styles.calendarImage}
                  resizeMode="cover"
                />
              ) : (
                <Loader />
              )}
              <Text style={styles.GenresText}>Calander</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.Related}>
            <Text style={[styles.PopularText, { marginTop: 10 }]}>
              Recently updated
            </Text>
          </View>
          {!loading ? (
            <FlatList
              horizontal
              data={AnimeList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.relatedAnime}>
                  <Anime result={item} isLink={true} />
                  <Text style={styles.relatedAnimeTitle}>
                    {(item.title.english || item.title.native || "N/A").length >
                    25
                      ? (item.title.english || item.title.native).substring(
                          0,
                          22
                        ) + "..."
                      : item.title.english || item.title.native}
                  </Text>
                  <Text style={styles.relatedAnimeEpisode}>
                    ~| {item.totalEpisodes || "N/A"} |~
                  </Text>
                </View>
              )}
              contentContainerStyle={{ gap: 10, padding: 10 }}
            />
          ) : (
            <Loader />
          )}
        </View>
      </View>
      <View style={styles.Popular}>
        <Text style={styles.PopularText}>Popular Anime</Text>
        {!loading ? (
          <FlatList
            data={AdvancedSearch}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AnimeItem result={item} isLink={true}/>}
            contentContainerStyle={{ gap: 30 }}
          />
        ) : (
          <Loader />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  upperContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 540,
  },
  TypeContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Profile: {
    height: 50,
    width: 50,
    borderRadius: 30,
    position: "absolute",
    top: 50,
    right: 15,
    overflow: "hidden",
  },
  ProfileImage: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
  },
  GenresBtn: {
    height: 75,
    width: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "transpareant",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  calendarImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  GenresText: {
    textAlign: "center",
    borderBottomWidth: 2,
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    borderColor: "deeppink",
  },
  Search: {
    width: 230,
    height: 50,
    borderRadius: 40,
    zIndex: 70,
    borderWidth: 1,
    borderColor: "grey",
    position: "absolute",
    top: 50,
    left: 40,
    justifyContent: "space-around",
    gap: 70,
    alignItems: "center",
    flexDirection: "row",
  },
  SearchText: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  Popular: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  PopularText: {
    fontSize: 25,
    width:260,
    fontFamily: "Poppins_700Bold",
  },
  icon: {
    color: "white",
    fontSize: 20,
    zIndex: 100,
  },
  slider: {
    height: 540,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -10,
  },
  
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  Related: {
    marginTop: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 30,
  },
  RelatedText: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  relatedAnime: {
    width: 120,
    minHeight: 200,
    padding: 10,
    alignItems: "center",
  },
  relatedAnimeTitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  relatedAnimeEpisode: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    fontStyle:'italic',
    color:'grey'
  },
});
