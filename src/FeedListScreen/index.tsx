import React, { useEffect, useState } from "react";
import RSSList from "../RSSList";
import parseRSS from "react-native-rss";
import { FlatList } from "react-native";
import { Feed } from "./Feed";
import FeedView from "./FeedView";

const FeedListScreen = () => {
  const [data, setData] = useState<Feed[]>([]);

  useEffect(() => {
    const allPromises = RSSList.map((rss) => {
      return fetch(rss.file).then((rsp: Response) => {
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

      setData(flattenedFeeds);
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

export default FeedListScreen;
