import { StyleSheet, FlatList, Pressable, ScrollView, useColorScheme, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome6 } from '@expo/vector-icons';
import Anime from '@/components/Anime';
import Courasale from '@/components/Courasale';
import React, { useState, useEffect } from 'react';
import { useFonts, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loader from '../../../components/Loader';
import { Link } from 'expo-router';
import AnimeItem from '../../../components/AnimeItem';

export default function TabOneScreen() {
  const data = [
    { id: '1', title: 'This Season' },
    { id: '2', title: 'Next Season' },
    { id: '3', title: 'Previous Season' },
  ];
  const [fontloaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold
  });

  const darkmode = useColorScheme() === 'dark';
  const [AnimeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [GenersImage, setGenersImage] = useState('');
  const [CalanderImage, setCalanderImage] = useState('');
  const [AdvancedSearch, setAdvancedSearch] = useState([]);


  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await fetch('https://consumet-api-two-nu.vercel.app/meta/anilist/trending');
        const result = await response.json();

        const response2 = await fetch('https://consumet-api-two-nu.vercel.app/meta/anilist/advanced-search');
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
        console.error('Error fetching trending anime:', error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchTrendingAnime();

  }, [loading]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Link href={'/SearchPage'} asChild>
            <Pressable style={styles.Search}>
              <Text style={styles.SearchText}>Anime</Text>
            </Pressable>
          </Link>
          <FontAwesome6 name='magnifying-glass' style={styles.icon} />
          <View style={styles.Profile}>
            <Image style={styles.ProfileImage} source={require("../../../assets/images/Catgirl.jpg" )}/>
          </View>
          <FlatList
            style={styles.btnContainer}
            horizontal
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={[styles.btn, { backgroundColor: darkmode ? 'black' : 'white' , shadowColor:darkmode? 'black':'white'}]}>
                <Text style={styles.btnText}>{item.title}</Text>
              </Pressable>
            )}
          />
          <View style={styles.slider}>
            {!loading ?
              <FlatList
                horizontal
                data={AnimeList}
                renderItem={({ item, index }) => (
                  <Courasale result={item} />
                )}
                keyExtractor={(item) => item.id.toString() || index.toString()}
                snapToAlignment='center'
                decelerationRate='fast'
                pagingEnabled
              /> :
              <Loader />
            }
          </View>
          <View style={styles.TypeContainer}>
            <Pressable style={styles.GenresBtn}>
              {CalanderImage != '' ? <Image source={{ uri: GenersImage }} style={styles.calendarImage} resizeMode='cover' /> : <Text>Loading...</Text>}
              <Text style={styles.GenresText}>Genres</Text>
            </Pressable>
            <Pressable style={styles.GenresBtn}>
              {CalanderImage != '' ? <Image source={{ uri: CalanderImage }} style={styles.calendarImage} resizeMode='cover' /> : <Text>Loading...</Text>}
              <Text style={styles.GenresText}>Calander</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.Related}>
            <Text style={[styles.PopularText, { marginTop: 10 }]}>Related Anime</Text>
          </View>
          {!loading ?
            <FlatList
              horizontal
              data={AnimeList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.relatedAnime}>
                  <Anime result={item} />
                  <Text style={styles.relatedAnimeTitle}>{(item.title.english || item.title.native || 'N/A').length > 25 ? (item.title.english || item.title.native).substring(0, 22) + '...' : (item.title.english || item.title.native)}</Text>
                  <Text style={styles.relatedAnimeEpisode}>~| {item.totalEpisodes || 'N/A'} |~</Text>
                </View>
              )}
              contentContainerStyle={{ gap: 10, padding: 10 }}
            />
            :
            <Loader />
          }
        </View>
      </View>
      <View style={styles.Popular}>
        <Text style={styles.PopularText}>Popular Anime</Text>
        {!loading ?
          <FlatList
            data={AdvancedSearch}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AnimeItem result={item} />
            )}
            contentContainerStyle={{ gap: 30 }}
          /> :
          <Loader />
        }
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  TypeContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Profile:{
    height: 50,
    width: 50,
    borderRadius: 30,
    position:'absolute',
    top:50,
    right: 15,
    overflow: 'hidden',
  },
  ProfileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  GenresBtn: {
    height: 75,
    width: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'transpareant',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    overflow: 'hidden',
  },
  calendarImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  GenresText: {
    borderBottomWidth: 3,
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    borderColor: 'deeppink'
  },
  Search: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 70,
    marginTop: 30,
    fontSize: 20,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: 'grey',
    position: 'absolute',
    top: 20,
    left:30
  },
  SearchText: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  Popular: {
    minHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PopularText: {
    fontSize: 25,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
    marginRight: 90,
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    right: 95,
    top: 65,
    color: 'white',
    fontSize: 20,
    zIndex: 100
  },
  slider: {
    height: 500,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
  },
  btnContainer: {
    flexDirection: 'row',
    height: 60,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    transform: 'translateY(350px)'
  },
  btn: {
    width: 130,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 20,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  Related: {
    marginTop: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
  },
  RelatedText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  relatedAnime: {
    width: 120,
    minHeight: 200,
    padding: 10,
    alignItems: 'center',
  },
  relatedAnimeTitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium'
  },
  relatedAnimeEpisode: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium'
  },
});
