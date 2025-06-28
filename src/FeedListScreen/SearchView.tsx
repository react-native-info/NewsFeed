import { Pressable, StyleSheet, TextInput, Dimensions, View } from "react-native";
import useThemedColors from "../useThemedColors";
import Icon from "@react-native-vector-icons/material-design-icons"
import { useState } from "react";

const searchBarWidth = Dimensions.get('window').width - 77;
const searchBarHeight = 36;

const SearchView = (
    { onSearchWordsChanged }: { onSearchWordsChanged?: (searchWord: string) => void }
) => {
    const [textInput, setTextInput] = useState('');

    const themedColors = useThemedColors();

    return (
        <View style={[styles.container, { backgroundColor: themedColors.searchBarBackground }]} >
            <TextInput
                style={{ flex: 1 }}
                onChangeText={(text) => {
                    try {
                        setTextInput(text);
                        onSearchWordsChanged?.(text);
                    } catch (e) {
                        // TODO: Error reporting
                    }
                }}
                value={textInput}
            />
            {Boolean(textInput) &&
                <Pressable onPress={() => { setTextInput('') }}>
                    <Icon name={'close-circle'} size={17} color={themedColors.text} />
                </Pressable>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: searchBarWidth,
        height: searchBarHeight,
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
    }
});

export default SearchView;
