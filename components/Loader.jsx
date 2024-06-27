import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

export default Loader;
const styles = StyleSheet.create({})


