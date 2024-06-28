import { Stack } from 'expo-router';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="Menu" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
            <Stack.Screen name="SearchPage" options={{ headerShown: false }} />
        </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
