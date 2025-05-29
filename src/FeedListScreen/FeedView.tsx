import React, { useState } from "react";
import { Feed } from "./Feed";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SourceView from "./SourceView";
import { useNavigation } from "@react-navigation/native";
import ErrorBoundary from "../ErrorBoundary";

interface FeedViewProp {
    feed: Feed;
}

const FeedView = (props: FeedViewProp) => {
    const { feed } = props;
    const [loadImageFailed, setLoadImageFailed] = useState(false);
    const navigation = useNavigation<any>();

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('Feed', { feed });
            }}
            style={styles.FeedCard}>
            <View style={styles.sectionTop}>
                <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={styles.sectionTitle}>
                    {feed.name}
                </Text>
                {feed.imageUrl && !loadImageFailed && (
                    <Image
                        style={styles.sectionImage}
                        source={{
                            uri: feed.imageUrl,
                        }}
                        onError={() => {
                            setLoadImageFailed(true);
                        }}
                    />
                )}
            </View>
            <View style={styles.metadata}>
                <SourceView
                    iconUri={feed.categoryIcon}
                    title={feed.source}
                    style={styles.metaTitle} />
                <Text
                    numberOfLines={1}
                    style={styles.metaDate}>
                    {feed.displayTime}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    FeedCard: {
        paddingBottom: 23,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    sectionTop: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        marginRight: 10,
        marginBottom: 10,
        gap: 10,
    },
    sectionImage: {
        width: 118,
        aspectRatio: 1.618,
        paddingLeft: 15,
        borderRadius: 5,
        resizeMode: 'contain',
    },
    sectionTitle: {
        flex: 1,
        fontSize: 15,
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaTitle: {
        marginRight: 22,
        width: 95
    },
    metaDate: {
        fontSize: 13,
        marginRight: 18,
        paddingBottom: 2,
        color: '#6f6f6f'
    },
});

const ReinforcedFeedView = (props: FeedViewProp) => (
    <ErrorBoundary fallbackView={null}><FeedView {...props} /></ErrorBoundary>
);

export default ReinforcedFeedView;
