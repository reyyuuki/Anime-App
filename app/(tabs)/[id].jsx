import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  ImageBackground,
  Pressable,
  Animated,
  Easing,
  useColorScheme,
  Image
} from "react-native";
import Anime from "../../components/Anime";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Geners from "../../components/geners";
import Loader from "../../components/Loader";
import Details from "../../components/Details";
import { FontAwesome6 } from "@expo/vector-icons";
import Episodes from "../../components/Episodes";
import { LinearGradient } from "expo-linear-gradient";
import AnimeCard from "../../components/AnimeCard";

const Id = () => {
  const [AnimeTitle, setAnimeTitle] = useState("");
  const [AnimeImage, setAnimeImage] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("");
  const [TotalEpisodes, setTotalEpisodes] = useState("");
  const [duration, setDuration] = useState("");
  const [format, setFormat] = useState("");
  const [studio, setStudio] = useState("");
  const [season, setSeason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [backImage, setBackImage] = useState("");
  const [romajiName, setRomajiName] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [Character, setCharacter] = useState([]);
  const [Recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState("");
  const [focused, setFocused] = useState(true);
  const [EpisodesData, setEpisodesData] = useState('');
  const { id } = useLocalSearchParams();

  const [fontloaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const isDarkMode = useColorScheme() === "dark";

  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await fetch(
          `https://consumet-api-two-nu.vercel.app/meta/anilist/info/${id}?provider=gogoanime`
        );
        const result = await response.json();

        if (result) {
          setBackImage(result.cover);
          setAnimeTitle(result.title.english || "N/A");
          setAnimeImage(result.image);
          setRating(result.rating);
          setStatus(result.status);
          setTotalEpisodes(result.totalEpisodes);
          setDuration(result.duration);
          setFormat(result.type);
          setStudio(result.studios[0]);
          setRomajiName(result.title.romaji);
          setCharacter(result.characters);
          setRecommendations(result.recommendations);
          setGenres(result.genres);
          setSynopsis(result.description.replace(/<\/?[^>]+(>|$)/g, ""));
          setFocused(true);
          setEpisodesData(result.episodes);
          setSeason(`${result.season}  ${result.endDate.year}`);
          const getMonthName = (monthNumber) => {
            const months = [
              "Invalid month number",
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            return months[monthNumber] || "Invalid month number";
          };

          const startMonth = getMonthName(result.startDate.month);
          const endMonth = getMonthName(result.endDate.month);

          const EndDay = result.endDate.day;
          const EndYear = result.endDate.year;
          setEndDate(`${EndDay} ${endMonth}, ${EndYear}`);

          const Startday = result.startDate.day;
          const Startyear = result.startDate.year;
          setStartDate(`${Startday} ${startMonth}, ${Startyear}`);
          console.log(result);
        }
      } catch (error) {
        console.error("Error fetching trending anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingAnime();

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
  }, [id]);

  function Navigation(){
    setFocused(!focused);
  }

  const translateX = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <View style={styles.TabBar}>
        <View style={[styles.Bar, {backgroundColor:isDarkMode ? "#1f1d1d": "#dce4e9"}]}>
          <Pressable onPress={() => Navigation()} style={[styles.BarContain, focused && styles.ActiveTab]}>
            <FontAwesome6
              style={styles.icon}
              name="circle-info"
              color="white"
            />
            <Text style={styles.BarText}>Info</Text>
          </Pressable>
          <Pressable onPress={() => Navigation()} style={[styles.BarContain, !focused && styles.ActiveTab]}>
            <FontAwesome6
              style={styles.icon}
              name="clapperboard"
              color="white"
            />
            <Text style={styles.BarText}>Watch</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={[
          styles.scrollView,
          { backgroundColor: isDarkMode ? "black" : "white" },
        ]}
      >
        <View style={styles.imageContainer}>
          <Animated.View
            style={{
              ...styles.animatedBackground,
              transform: [{ translateX }],
            }}
          >
            <ImageBackground
              source={{ uri: backImage }}
              style={styles.backgroundImage}
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
          <View style={styles.Info}>
            <View style={styles.animeInfo}>
              <AnimeCard result={{ image: AnimeImage }} />
              <View style={styles.TitleInfo}>
                <Text
                  style={[
                    styles.TitleText,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  Anime details:{AnimeTitle}
                </Text>
                <Text style={styles.animeStatus}>Releasing</Text>
              </View>
            </View>
            <Pressable
              style={[
                styles.addbtn,
                { backgroundColor: "transparent" },
                { borderColor: isDarkMode ? "white" : "black" },
              ]}
            >
              <Text style={styles.addbtnText}>Add to list</Text>
            </Pressable>
          </View>
        </View>
        {focused ? (
          <>
            <View
              style={[
                styles.DetailsContainer,
                { backgroundColor: isDarkMode ? "black" : "white" },
              ]}
            >
              <Details name="Mean Score" data={`${rating / 10}/10` || "N/A"} />
              <Details name="Status" data={status || "N/A"} />
              <Details name="Total Episodes" data={TotalEpisodes || "N/A"} />
              <Details
                name="Average Duration"
                data={`${duration} min` || "N/A"}
              />
              <Details name="Format" data={format || "N/A"} />
              <Details name="Studio" data={studio || "N/A"} />
              <Details name="Season" data={season || "N/A"} />
              <Details name="Start Date" data={startDate || "N/A"} />
              <Details name="End Date" data={endDate || "N/A"} />
            </View>
            <View style={styles.Names}>
              <View style={styles.Tittles}>
                <Text style={styles.DetailsText}>Name Romaji</Text>
                <Text
                  style={[
                    styles.DetailsInfo,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  {romajiName}
                </Text>
              </View>
              <View style={styles.Tittles}>
                <Text style={styles.DetailsText}>Name</Text>
                <Text
                  style={[
                    styles.DetailsInfo,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  {AnimeTitle}
                </Text>
              </View>
              <View style={styles.Tittles}>
                <Text style={styles.DetailsText}>Synopsis</Text>
                <Text
                  style={[
                    styles.DetailsInfo,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  {synopsis}
                </Text>
              </View>
            </View>
            <View style={styles.genresContainer}>
              <Geners genres={genres} />
            </View>
            <View style={styles.CharactersContainer}>
              <Text
                style={[
                  styles.CharacterText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                Characters
              </Text>
              <FlatList
                horizontal
                data={Character}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.CharacterInfo}>
                    <AnimeCard result={item} />
                    <Text
                      style={[
                        styles.CharacterName,
                        { color: isDarkMode ? "white" : "black" },
                      ]}
                    >
                      {item.name.full}
                    </Text>
                    <Text style={styles.role}>{item.role}</Text>
                  </View>
                )}
                contentContainerStyle={{ gap: 20, padding: 10 }}
              />
            </View>
            <View style={styles.Recommended}>
              <Text
                style={[
                  styles.CharacterText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                Recommended
              </Text>
              <FlatList
                horizontal
                data={Recommendations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.CharacterInfo}>
                    <Anime result={item} />
                    <Text
                      style={[
                        styles.TittleName,
                        { color: isDarkMode ? "white" : "black" },
                      ]}
                    >
                      {item.title.english || item.title.romaji}
                    </Text>
                    <Text
                      style={[
                        styles.episodes,
                        { color: isDarkMode ? "white" : "black" },
                      ]}
                    >
                      ~|{item.episodes}|~
                    </Text>
                  </View>
                )}
                contentContainerStyle={{ gap: 20, padding: 10 }}
              />
            </View>
          </>
        ) : (
          <View style={styles.container}>
            <View style={styles.Header}>
              <View
                style={[
                  styles.tittle,
                  { backgroundColor: isDarkMode ? "black" : "white" },
                ]}
              >
                <Text
                  style={[
                    styles.HeaderText,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  {AnimeTitle}
                </Text>
              </View>
              <View style={styles.Anilistinfo}>
                <View
                  style={[
                    styles.Anilist,
                    { backgroundColor: isDarkMode ? "black" : "white" },
                  ]}
                >
                  <FontAwesome6 name="folder-open" style={styles.notify} />
                  <Text
                    style={[
                      styles.TitleText,
                      { color: isDarkMode ? "white" : "black" },
                      { fontSize: 18 },
                    ]}
                  >
                    Source:  Anilist
                  </Text>
                </View>
                <FontAwesome6 name="bell" style={styles.notify} />
              </View>
            </View>
            <View style={styles.EpisodeInfo}>
              <Text style={[styles.tittle,{padding:20, fontSize:34,marginRight:120, color:isDarkMode? 'white':'black'}]}>Episodes</Text>
              <FlatList
              data={EpisodesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) =>(
                <Episodes result={item}/>
              )}
              contentContainerStyle={{ gap: 15, padding: 10 }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  EpisodeInfo:{
    width: "100%",
    minHeight: 300,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
  },
  TabBar: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
  Bar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "70%",
    height: 65,
    backgroundColor: "#1f1d1d",
    borderRadius: 50,
  },
  container: {
    width: "100%",
    minHeight: "100%",
  },
  Header: {
    width: "100%",
    minHeight: 150,
    justifyContent: "space-evenly",
  },
  tittle: {
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins_700Bold",
  },
  Anilist: {
    width: "90%",
    height: 55,
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "deeppink",
    justifyContent: "space-evenly",
    borderRadius: 10,
    alignItems: "center",
  },
  HeaderText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins_700Bold",
    padding: 10,
    paddingHorizontal: 20,
  },
  BarContain: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 45,
    width: 90,
    gap: 5,
    borderRadius: 25,
    padding: 10,
  },
  ActiveTab:{
    backgroundColor:'deeppink'
  },
  Anilistinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 40,
    paddingHorizontal: 20,
  },
  notify: {
    color: "grey",
    fontSize: 22,
    marginLeft: 10,
  },
  BarText: {
    fontSize: 15,
    color: "white",
    fontFamily: "Poppins_700Bold",
  },
  icon: {
    fontSize: 15,
  },
  imageContainer: {
    width: "100%",
    height: 400,
  },
  backgroundImage: {
    width: 600,
    height: 300,
    transform: "scale(1.7)",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  animatedBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  DetailsText: {
    fontSize: 14,
    color: "grey",
    fontFamily: "Poppins_500Medium",
  },
  DetailsInfo: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
  Info: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  CharactersContainer: {
    width: "100%",
    minHeight: 300,
    justifyContent: "center",
  },
  CharacterText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  CharacterName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    paddingVertical: 5,
    textAlign: "center",
    width: 120,
    maxHeight: 70,
  },
  role: {
    fontFamily: "Poppins_500Medium",
    color: "grey",
    fontSize: 14,
    textAlign: "right",
  },
  Recommended: {
    width: "100%",
    height: 400,
    justifyContent: "center",
  },
  TittleName: {
    width: 100,
    fontFamily: "Poppins_500Medium",
    paddingVertical: 5,
  },
  episodes: {
    width: 100,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  TitleInfo: {
    justifyContent: "space-between",
  },
  animeStatus: {
    fontFamily: "Poppins_700Bold",
    color: "deeppink",
    fontSize: 16,
  },
  animeInfo: {
    width: "100%",
    height: 300,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  TitleText: {
    width: 180,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  image: {
    width: 300,
    height: 300,
  },
  addbtn: {
    width: 300,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "400",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  addbtnText: {
    color: "deeppink",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  DetailsContainer: {
    width: "100%",
    height: 400,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },

  Names: {
    width: "100%",
    minHeight: 500,
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  genresContainer: {
    minHeight: 100,
  },
});

export default Id;
