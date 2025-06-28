import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Feed } from "./Feed";
import FeedView from "./FeedView";
import ErrorBoundary from "../ErrorBoundary";
import ErrorScreen from "../ErrorScreen";
import { useNavigation } from "@react-navigation/native";
import SearchView from "./SearchView";
import useFeedList from "./useFeedList";

const FeedListScreen = () => {
  const navigation = useNavigation();
  const { feedList, fetchFeedLists, searchFeeds } = useFeedList();

  useEffect(() => {
    fetchFeedLists();

    navigation.setOptions({
      headerTitle: () =>
        <SearchView onSearchWordsChanged={searchFeeds} />
    });
  }, []);


  return (
    <FlatList
      data={feedList}
      renderItem={({ item }: { item: Feed }) => (
        <FeedView
          feed={item}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const ReinforcedFeedListScreen = () => (
  <ErrorBoundary fallbackView={<ErrorScreen />}><FeedListScreen /></ErrorBoundary>
);

export default ReinforcedFeedListScreen;
