import React from 'react';
import { StyleSheet, TextInput, ScrollView, useColorScheme} from 'react-native';
import { Text, View } from '@/components/Themed';


const SearchPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ScrollView style={[styles.scrollView, {backgroundColor: isDarkMode? 'black': 'white'}]}>
            <View style={styles.InputContainer}>
            <TextInput style={styles.Input} placeholder='Anime'/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    scrollView: {
        flexGrow: 1,
    },
    InputContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    Input:{
        backgroundColor:'grey',
        width:'90%',
        height:50,
        borderRadius:40,
        paddingHorizontal:20,
        paddingVertical:10,
        marginTop:30,
    },
})

export default SearchPage;
