import { Stack } from 'expo-router';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="AnimeY" options={{ headerShown: false }} />
        </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
