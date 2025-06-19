import { useRoute } from "@react-navigation/native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import useThemedColors from "./useThemedColors";

const FeedScreen = () => {
    const route = useRoute<any>();
    const { feed } = route?.params ?? {};
    const themedColors = useThemedColors();

    return (
        <FlatList
            ListHeaderComponent={
                <View>
                    {Boolean(feed.imageUrl) ?
                        <Image
                            style={styles.headerImage}
                            source={{ uri: feed?.imageUrl }}
                        /> : null
                    }
                    <Text style={[styles.title, { color: themedColors.text }]}>{feed.name}</Text>
                </View>
            }
            data={feed.content}
            renderItem={({ item }) => (
                <Text
                    style={[styles.body, { color: themedColors.text }]}
                >
                    {item}
                </Text>
            )}
        />
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: 120,
    },
    title: {
        fontSize: 26,
        padding: 15
    },
    body: {
        fontSize: 18,
        paddingHorizontal: 15
    }
});

export default FeedScreen;