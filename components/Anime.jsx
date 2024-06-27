import React from 'react';
import { StyleSheet, Image, Pressable,View,Text } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFonts, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Anime = ({ result }) => {
    const {  id, image} = result;
    const [fontloaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold
      });
    return (
        <Link href={`/${id}`} asChild>
        <Pressable style={styles.animePhoto}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode='cover'
            />
            <View style={styles.ratingBtn}>
                <Text style={styles.rating}>{result.rating/10 || 'N/A'}</Text>
                    <FontAwesome6 name="star" size={12} color="white" />
            </View>
        </Pressable>
    </Link>
    );
};

export default Anime;

const styles = StyleSheet.create({
    animePhoto: {
        width: 110,
        height: 150,
        borderRadius: 20,
        overflow: 'hidden',
        elevation:20
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBtn: {
        width:60,
        height:25,
        backgroundColor:'rgba(246,84,152,0.8)',
        borderRadius:15,
        position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -2,
        right: -3,
        flexDirection:'row',
        paddingHorizontal:10,
        gap:5
    },
    rating:{
        fontFamily:'Poppins_500Medium',
        color:'white',
        marginTop:3
    }
});