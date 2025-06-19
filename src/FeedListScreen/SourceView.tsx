import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import useThemedColors from "../useThemedColors";

const SourceView = (
    { iconUri, title, style }:
        { iconUri: string, title: string, style: ViewStyle }
) => {
    const themedColors = useThemedColors();

    return (
        <View style={[styles.container, style]}>
            <Image
                source={{
                    uri: iconUri,
                }}
                style={styles.icon}
            />
            <Text
                numberOfLines={1}
                style={[styles.text, { color: themedColors.textDim }]}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    icon: {
        width: 13,
        height: 13,
    },
    text: {
        fontSize: 13,
        paddingBottom: 2,
        color: '#6f6f6f'
    },
});

export default SourceView;
