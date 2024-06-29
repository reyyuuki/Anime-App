import React from 'react';
import { StyleSheet,Image,Pressable} from 'react-native';

const AnimeCard = ({result}) => {
    return (
        <Pressable style={styles.animePhoto}>
            <Image
                source={{ uri: result.image }}
                style={styles.image}
                resizeMode='cover'
            />
        </Pressable>
    );
}

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
})

export default AnimeCard;
