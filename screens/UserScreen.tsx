import {Linking, View} from "react-native";
import {List, SegmentedButtons, Text} from 'react-native-paper'
import {shareDatabaseAsCSV} from "../utils/ExportDatabase";
import {StatusBar} from "expo-status-bar";
import {useExportDatabase} from "../utils/expire/useExportDatabase";
import {useEffect, useState} from "react";
import {fetchCounterData, saveCounterValue} from '../utils/StorageUtils'

export default function UserScreen(){
    const [isExported, setIsExported] = useState(false)
    const [value, setValue] = useState('')
    const {data} = useExportDatabase(isExported)

    useEffect(() => {
        const initializeCounter = async () => {
            const data = await fetchCounterData()
            if (data) {
                setValue(data)
            }
        }
        initializeCounter()
    }, []);


    const handleCounterClick = (type: string) => {
        setValue(type)
        saveCounterValue(type)
    }


    return (
        <View style={{flex:1}}>
            <StatusBar style='light'/>
            <List.Section>
                <List.Subheader>Remind me </List.Subheader>
                <SegmentedButtons
                    value={value}
                    onValueChange={handleCounterClick}
                    buttons={[
                        {
                            value: '1',
                            label: '1 Day Left',
                        },
                        {
                            value: '3',
                            label: '3 Days Left',
                        },
                        {
                            value: '7',
                            label: '7 Days Left',
                        }
                    ]}
                />



                <List.Subheader>Developer</List.Subheader>
                <List.Item
                    title="support@smmnw.com"
                    left={() => <List.Icon icon="email-outline"/>}
                    onPress={()=>{
                        Linking.openURL('mailto:support@smmnw.com')
                    }}
                />
                <List.Item title="https://smmnw.com" left={() => <List.Icon icon="web" />}
                           onPress={() => {
                               Linking.openURL('https://smmnw.com')
                           }}/>


                <List.Subheader>About Expiry Alert </List.Subheader>
                <List.Item title='Export Database as CSV' left={() => <List.Icon icon='export'/>} onPress={() => {

                    setIsExported(true)
                    //@ts-ignore
                    shareDatabaseAsCSV(data).finally(() => {
                        setIsExported(
                            false
                        )
                    })
                }}/>
                <List.Item title='Privacy Policy' left={() => <List.Icon icon='alert-box-outline'/>} onPress={() => {
                    Linking.openURL('https://expiryalert.blogspot.com/2025/01/privacy-policy-for-expiry-alert.html')
                }}/>
                <List.Item title='Website' left={() => <List.Icon icon='web'/>} onPress={() => {
                    Linking.openURL('https://expiryalert.blogspot.com')
                }}/>
                <Text style={{margin:8}}>
                    Expire App tracks item expiration dates, sends timely reminders, and works offline to manage your essentials effortlessly.
                </Text>
            </List.Section>
        </View>
    )
}