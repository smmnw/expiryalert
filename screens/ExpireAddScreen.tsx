import {Button, Text, TextInput} from "react-native-paper";
import {View} from "react-native";
import {useEffect, useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useExpireAdd} from "../utils/expire/useExpireAdd";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import useExpireDelete from "../utils/expire/useExpireDelete";
import {useExpireFetch} from "../utils/expire/useExpireFetch";
import {useExpireUpdate} from "../utils/expire/useExpireUpdate";
import {StatusBar} from "expo-status-bar";

type RootStackParamList = {
    ExpireScreen: undefined,
    ExpireAddScreen: { itemID?: number; otherParam?: string }
    UserScreen: undefined
}

interface ExpireAddScreenProps {
    route: RouteProp<RootStackParamList, 'ExpireAddScreen'>
    navigation: StackNavigationProp<RootStackParamList, 'ExpireAddScreen'>;

}


export default function ExpireAddScreen({route,navigation}: ExpireAddScreenProps) {
    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<Date>(new Date())
    const [isShow, setIsShow] = useState<boolean>(false)
    const {mutate: addExpire} = useExpireAdd()
    const {mutate:deleteExpire} =useExpireDelete()
    const {mutate:fetchExpire,data} =useExpireFetch()
    const {mutate:updateExpire} =useExpireUpdate()
    const itemID = route.params?.itemID


    useEffect(() => {
        navigation.setOptions({title: itemID ? 'Update Expire' : 'Add Expire'})
    }, [navigation]);

    useEffect(() => {
        if(itemID){
           // @ts-ignore
            fetchExpire({id:itemID},{onSuccess:(data)=>{
                //@ts-ignore
                setName(data.name)
                //@ts-ignore
                    setDate(new Date(data.date))
                }})
        }
    }, [itemID]);




    const handleAdd=()=>{
        addExpire({name, date, category: 'uncategory'}, {
            onSuccess: () => {
                setName('')
                setDate(new Date())
                navigation.goBack()
            }
        })
    }

    const handleUpdate=()=>{
        //@ts-ignore
          updateExpire({id:itemID,name,date,category:data.category},{onSuccess:()=>{
                 navigation.goBack()
              }})
    }

    const handleDelete=()=>{
        deleteExpire({id:itemID},{
            onSuccess:()=>{
                setName('')
                setDate(new Date())
                navigation.goBack()
        }
        })
    }

    return (
        <View style={{flex: 1, margin: 8}}>
            <StatusBar style='light'/>
            <TextInput value={name} onChangeText={setName} label='Name' mode='outlined' style={{marginVertical: 4}}/>
            <Text variant='bodyLarge'
                  style={{margin: 8, fontWeight: 'bold'}}>{`Expire Date : ${date.toLocaleDateString()}`}</Text>
            {isShow && <View style={{alignItems: 'center', margin: 8}}><DateTimePicker
                value={date}
                onChange={(event, selectedDate) => {
                    // @ts-ignore
                    setDate(selectedDate)
                    setIsShow(false)
                }}
            /></View>}
            <Button onPress={() => {
                setIsShow(prevState => !prevState)
            }} mode='contained-tonal' textColor='#ffffff'>Choose Date</Button>

            <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                <Button onPress={() => {
                    navigation.goBack()
                }}>Cancel</Button>
                {itemID && <Button onPress={()=>{
                    handleDelete()
                }}>Delete</Button>}
                <Button mode='elevated' onPress={() => {
                    if(itemID) {
                        handleUpdate()
                    }else {
                        handleAdd()
                    }

                }} disabled={!name}>{itemID ? 'Update' : 'Save'}</Button>
            </View>
        </View>
    )
}