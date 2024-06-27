import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

const Anime = ({ result }) => {
    const {  id, image} = result;
    return (
        <Link href={`/${id}`} asChild>
        <Pressable style={styles.animePhoto}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode='cover'
            />
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
});
