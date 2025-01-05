import {View,Linking} from "react-native";
import {List,Text} from 'react-native-paper'
import {shareDatabase} from "../utils/ExportDatabase";
export default function UserScreen(){
    return (
        <View style={{flex:1}}>
            <List.Section>
                <List.Subheader>Developer</List.Subheader>
                <List.Item
                    title="saimgmg.nyanwin@smmnw.com"
                    left={() => <List.Icon  icon="email" />}
                    onPress={()=>{
                        Linking.openURL('mailto:saimgmg.nyanwin@smmnw.com')
                    }}
                />
                <List.Item title="https://smmnw.com" left={() => <List.Icon icon="web" />}
                onPress={()=>{
                    Linking.openURL('https://smmnw.com')
                }}/>
                <List.Subheader>About Expiry Alert </List.Subheader>
                <List.Item title='Export Database' left={()=><List.Icon icon='export' />} onPress={()=>{
                    shareDatabase()
                }}/>
                <List.Item title='Private Policy' left={()=><List.Icon icon='alert-box' />} onPress={()=>{
                    Linking.openURL('https://saimgmgnyanwin.blogspot.com/2025/01/expiryalert.html')
                }}/>
                <Text style={{margin:8}}>
                    Expire App tracks item expiration dates, sends timely reminders, and works offline to manage your essentials effortlessly.
                </Text>
            </List.Section>


        </View>
    )
}