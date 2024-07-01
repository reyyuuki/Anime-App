import React from 'react';
import {Text} from '@/components/Themed'
import {FlatList,Pressable, StyleSheet,useColorScheme} from 'react-native';
import {
    useFonts,
    Poppins_500Medium,
    Poppins_700Bold,
  } from "@expo-google-fonts/poppins";

const Btn = () => {
    const [fontloaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
      });
    const isDarkMode = useColorScheme() === 'dark';
    const data = [
        { id: "1", title: "This Season" },
        { id: "2", title: "Next Season" },
        { id: "3", title: "Previous Season" },
      ];
    return (
        <FlatList
        contentContainerStyle={styles.btnContainer}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: isDarkMode ? "#1f1d1d" : "white",
                shadowColor: isDarkMode ? "black" : "white",
              },
            ]}
          >
            <Text style={styles.btnText}>{item.title}</Text>
          </Pressable>
        )}
      />
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        height: 50,
        padding:10,
        transform: "translateY(400px)",
        marginHorizontal: 50
      },
      btn: {
        width: 130,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        borderWidth: 1,
        borderColor: "grey",
        elevation: 20,
      },
      btnText: {
        fontSize: 14,
        fontFamily:'Poppins_700Bold'
      },
})

export default Btn;
