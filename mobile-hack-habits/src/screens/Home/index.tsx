import { View, Text, StatusBar } from "react-native"
import { Header } from "../../components/Header"

export const Home = () => {
    return (
        <View className="bg-background flex-1 px=8 pt-16" >
            <Header />
        </View>
    )
}