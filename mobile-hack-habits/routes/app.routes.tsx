import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../src/screens/Home/index";
import { NewHabit } from "../src/screens/NewHabit/index";
import { Habit } from './../src/screens/Habit/index';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator>
            <Screen
                name="home"
                component={Home}
            />

            <Screen
                name="new"
                component={NewHabit}
            />

            <Screen
                name="habit"
                component={Habit}
            />
        </Navigator>
    )
}

export default AppRoutes();
