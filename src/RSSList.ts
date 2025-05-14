interface RSS {
    name: string;
    file: string;
    icon: string;
};

const RSSList = [{
    file: 'https://feeds.arstechnica.com/arstechnica/index',
    name: 'arstechnica',
    icon: 'https://cdn.arstechnica.net/wp-content/uploads/2016/10/cropped-ars-logo-512_480-60x60.png'
}, {
    file: 'https://techcrunch.com/feed/',
    name: 'techcrunch',
    icon: 'https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png?w=32'
}, {
    file: 'https://www.theverge.com/rss/index.xml',
    name: 'theverge',
    icon: 'https://www.theverge.com/static-assets/icons/favicon-16x16.png'
}, {
    file: 'https://www.theregister.com/off_prem/channel/headlines.atom',
    name: 'theregister',
    icon: 'https://www.theregister.com/design_picker/13249a2e80709c7ff2e57dd3d49801cd534f2094/graphics/favicons/favicon.ico'
}, {
    file: 'https://hackaday.com/blog/feed/',
    name: 'hackaday',
    icon: 'https://hackaday.com/wp-content/themes/hackaday-2/favicon.ico?v=3'
}];

export default RSSList;
