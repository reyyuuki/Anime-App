import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, ScrollView, useColorScheme, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome6 } from '@expo/vector-icons';
import Loader from '../../components/Loader';
import Anime from '../../components/Anime';



const SearchPage = () => {
    const [data, setData] = useState([]);
    
    const [Title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTrendingAnime = async () => {
            try {
                const response = await fetch(`https://consumet-api-two-nu.vercel.app/meta/anilist/${name}`);
                const result = await response.json();
                console.log(result);

              
                if (result.results && result.results.length > 0) {
                    setData(result.results);
                }
                
            } catch (error) {
                console.error('Error fetching trending anime:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTrendingAnime();

    }, [name]);
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ScrollView style={[styles.scrollView, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
            <View style={styles.InputContainer}>
                <TextInput style={[styles.Input, { color: isDarkMode ? 'white' : 'black' }]} placeholder='Anime' placeholderTextColor={'grey'} onChangeText={setName}/>
                <FontAwesome6 name='magnifying-glass' style={[styles.icon, { color: isDarkMode ? 'white' : 'black' }]} />
            </View>
            <View style={styles.Searchcontainer}>
                <Text style={styles.searchText}>Search Results</Text>
                <View style={styles.searchResults}>
                    {!loading ?
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.searchItem}>
                                    <Anime result={item} />
                                    <Text style={styles.searchResultText}>{item.title.english || item.title.romaji  || 'N/A'}</Text>
                                    <Text style={styles.relatedAnimeEpisode}>~| {item.totalEpisodes || 'N/A'} |~</Text>
                                </View>
                            )}
                            numColumns={2}
                            columnWrapperStyle={styles.row}
                        /> :
                        <Loader />
                    }
                </View>
            </View>
           
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    scrollView: {
        flexGrow: 1,
    },
    InputContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    Input: {
        width: '90%',
        height: 50,
        borderRadius: 40,
        paddingHorizontal: 20,
        marginTop: 60,
        borderWidth: 2,
        borderColor: 'deeppink',
        fontSize: 20,
        fontFamily: 'Poppins_500Medium',
    },
    row: {
        flex: 1,
        justifyContent:'space-between',
        padding: 10,
        minWidth:'50%',
    },
    icon: {
        color: 'deeppink',
        fontSize: 20,
        zIndex: 100,
        position: 'absolute',
        right: 40,
        top: 75,
        color: 'white',
        fontSize: 20,
    },
    Searchcontainer: {
        minHeight: 300,
        width: '100%',
        padding: 10,
        gap:30
    },
    searchText: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        marginTop: 30,
        paddingHorizontal: 15
    },
    searchItem:{
        padding:20
    },
    searchResultText:{
        width:100,
        fontFamily: 'Poppins_500Medium',
        marginTop:10
    },
})

export default SearchPage;
