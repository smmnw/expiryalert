import ExpireScreen from "./screens/ExpireScreen";
import {NavigationContainer, RouteProp, useNavigation} from '@react-navigation/native'
import {IconButton, PaperProvider} from 'react-native-paper'
import {createStackNavigator} from "@react-navigation/stack";
import ExpireAddScreen from "./screens/ExpireAddScreen";
import SQLiteProvider from "./utils/SQLiteProvider";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from "react";
import UserScreen from "./screens/UserScreen";

export default function App() {

    const client = new QueryClient()
    return (
        <NavigationContainer>
            <PaperProvider>
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
    const navigation = useNavigation()
    return (
        <Stack.Navigator>
            <Stack.Screen name='ExpireScreen' component={ExpireScreen} options={{
                headerRight: () => {
                    return <IconButton icon="dots-vertical" onPress={() => {
                        //@ts-ignore
                        navigation.navigate('UserScreen')
                    }}/>
                }
            }}/>

            <Stack.Screen
                name='ExpireAddScreen'
                //@ts-ignore
                          component={ExpireAddScreen}/>
            <Stack.Screen name='UserScreen' component={UserScreen}/>
        </Stack.Navigator>
    )
}


