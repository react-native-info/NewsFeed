import { View, Image, Text } from "react-native"

const ErrorScreen = () => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Image style={{ width: '100%', resizeMode: 'contain' }} source={require('./assets/404.png')} />
    </View >
}

export default ErrorScreen;
