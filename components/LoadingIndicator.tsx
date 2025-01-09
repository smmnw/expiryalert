import {View} from "react-native";
import {ActivityIndicator} from 'react-native-paper'
export default function LoadingIndicator(){

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator />
        </View>
    )
}