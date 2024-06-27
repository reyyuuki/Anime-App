import React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import { TextInput } from 'react-native-web';

const SearchPage = () => {
    return (
        <View>
            <TextInput/>
            <Text>Welcome</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SearchPage;
