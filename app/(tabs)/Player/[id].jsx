import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from 'expo-screen-orientation';

const Id = () => {

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    console.log("Component Mounted");

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        style={{ height: '100%', width: '100%' }}
        source={{
          uri: "https://www084.vipanicdn.net/streamhls/027e9529af2b06fe7b4f47e507a787eb/ep.1.1703905435.1080.m3u8",
        }}
        useNativeControls={true}
        shouldPlay={true}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Id;
