import parseRSS from "react-native-rss";
import reinforcedFetch from "../reinforcedFetch";
import RSSList from "../RSSList";

const fetchRSS = async () => {
    const allPromises = RSSList.map((rss) => {
        return reinforcedFetch(rss.file).then((rsp: Response) => {
            return rsp.text();
        }).then((xml: string) => {
            return parseRSS(xml, rss);
        });
    });

    return Promise.all(allPromises);
}

export default fetchRSS;