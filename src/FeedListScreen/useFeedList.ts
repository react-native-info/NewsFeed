import { useRef, useState } from "react";
import { Feed } from "./Feed";
import fetchRSS from "./fetchRss";

const useFeedList = () => {
    const [data, setData] = useState<Feed[]>([]);
    const savedFeedList = useRef<Feed[]>([]);

    const fetchFeedLists = async () => {
        const fetchedFeeds = await fetchRSS();
        parseAllFeeds(fetchedFeeds);
    }

    const parseAllFeeds = (feeds: Feed[]) => {
        const flattenedFeeds = feeds?.flat(1)?.filter(el => !!el)?.sort(
            (lhv: Feed, rhv: Feed): number =>
                rhv.datePublished.getTime() - lhv.datePublished.getTime()
        );

        savedFeedList.current = flattenedFeeds;
        setData(flattenedFeeds);
    }

    const searchFeeds = (searchWord: string) => {
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
    }

    return { feedList: data, searchFeeds, fetchFeedLists }
}

export default useFeedList;
