import React from 'react';
import {View, StyleSheet, Text, useColorScheme} from 'react-native';

const Details = ({name , data}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.Details}>
          <Text style={styles.DetailsText}>{name}</Text>
          <Text style={[styles.DetailsInfo,{color: isDarkMode? 'white':'black'}]}>{data}</Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
    Details: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  DetailsText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Poppins_500Medium'
  },
  DetailsInfo: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold'
  },

})

export default Details;
