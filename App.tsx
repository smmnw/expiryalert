import ExpireScreen from "./screens/ExpireScreen";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
    useNavigation
} from '@react-navigation/native'
import {
    adaptNavigationTheme,
    IconButton,
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
    useTheme} from 'react-native-paper'
import {createStackNavigator} from "@react-navigation/stack";
import ExpireAddScreen from "./screens/ExpireAddScreen";
import SQLiteProvider from "./utils/SQLiteProvider";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from "react";
import UserScreen from "./screens/UserScreen";
import deepmerge from "deepmerge";

const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationDark: NavigationDarkTheme,
    reactNavigationLight: NavigationDefaultTheme
})
const customColors = {
    primary: '#607d8b', // BlueGrey from Material Design
    secondary: '#90a4ae', // A lighter BlueGrey shade
    accent: '#ff5722', // Accent color (optional)
    background: '#eceff1', // Light background
    surface: '#ffffff', // Default surface color
    text: '#263238', // Default text color
    onSurface: '#37474f', // Text on surface
    secondaryContainer: '#90a4ae',
    primaryContainer: '#607d8b',
    onPrimaryContainer: '#ffffff'
}

const combinedDefaultTheme = deepmerge(LightTheme, MD3LightTheme)
const combinedDarkTheme = deepmerge(DarkTheme, MD3DarkTheme)

const customDefaultTheme = {
    ...combinedDefaultTheme, colors: {
        ...combinedDefaultTheme.colors,
        ...customColors
    }
}
export default function App() {

    const client = new QueryClient()
    return (
        //@ts-ignore
        <NavigationContainer theme={customDefaultTheme}>
            <PaperProvider theme={customDefaultTheme}>
                <SQLiteProvider>
                    <QueryClientProvider client={client}>
                        <AppFlow/>
                    </QueryClientProvider>

                </SQLiteProvider>
            </PaperProvider>
        </NavigationContainer>
    );
}


const Stack = createStackNavigator()

function AppFlow() {
    const theme = useTheme()
    const navigation = useNavigation()
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: theme?.colors.primary,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        }}>
            <Stack.Screen name='ExpireScreen' component={ExpireScreen} options={{
                headerRight: () => {
                    return (
                        <IconButton icon="dots-vertical" iconColor="white" onPress={() => {
                        //@ts-ignore
                        navigation.navigate('UserScreen')}}/>
                       )
                },
                title: 'All'
            }}/>

            <Stack.Screen
                name='ExpireAddScreen'
                //@ts-ignore
                component={ExpireAddScreen}

            />
            <Stack.Screen name='UserScreen' component={UserScreen} options={{
                title: "Setting"
            }}/>
        </Stack.Navigator>
    )
}


