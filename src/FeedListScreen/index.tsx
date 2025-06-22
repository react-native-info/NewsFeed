import React, { useEffect, useRef, useState } from "react";
import RSSList from "../RSSList";
import parseRSS from "react-native-rss";
import { FlatList } from "react-native";
import { Feed } from "./Feed";
import FeedView from "./FeedView";
import ErrorBoundary from "../ErrorBoundary";
import ErrorScreen from "../ErrorScreen";
import reinforcedFetch from "../reinforcedFetch";
import { useNavigation } from "@react-navigation/native";
import SearchView from "./SearchView";

const FeedListScreen = () => {
  const [data, setData] = useState<Feed[]>([]);
  const savedFeedList = useRef<Feed[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const allPromises = RSSList.map((rss) => {
      return reinforcedFetch(rss.file).then((rsp: Response) => {
        return rsp.text();
      }).then((xml: string) => {
        return parseRSS(xml, rss);
      });
    });

    Promise.all(allPromises).then((fetchedFeeds: Feed[]) => {
      const flattenedFeeds = fetchedFeeds?.flat(1)?.filter(el => !!el)?.sort(
        (lhv: Feed, rhv: Feed): number =>
          rhv.datePublished.getTime() - lhv.datePublished.getTime()
      );

      savedFeedList.current = flattenedFeeds;
      setData(flattenedFeeds);
    });

    navigation.setOptions({
      headerTitle: () =>
        <SearchView onSearchWordsChanged={(searchWord) => {
          if (!searchWord) {
            setData(savedFeedList.current);
          }

          const loweredSearchWord = searchWord.toLowerCase();
          const searchResult = savedFeedList.current.filter((entry) => {
            if (entry.name.toLowerCase().includes(loweredSearchWord)) {
              return entry;
            }
          })

          setData(searchResult);
        }} />
    });
  }, []);


  return (
    <FlatList
      data={data}
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
