import {Button, Text, TextInput} from "react-native-paper";
import {View} from "react-native";
import {useEffect, useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useExpireAdd} from "../utils/expire/useExpireAdd";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import useExpireDelete from "../utils/expire/useExpireDelete";
import {useExpireFetch} from "../utils/expire/useExpireFetch";
import {useExpireUpdate} from "../utils/expire/useExpireUpdate";

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
        if(itemID){
           // @ts-ignore
            fetchExpire({id:itemID},{onSuccess:(data)=>{
                //@ts-ignore
                setName(data.name)
                //@ts-ignore
                    setDate(new Date(parseInt(data.date)))
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
            <TextInput value={name} onChangeText={setName} label='Name of item'/>
            <Text style={{textAlign: 'center'}}>{`Expire Date : ${date.toLocaleDateString()}`}</Text>
            {isShow && <DateTimePicker
                value={date}
                onChange={(event, selectedDate) => {
                    // @ts-ignore
                    setDate(selectedDate)
                    setIsShow(false)
                }}
            />}
            <Button onPress={() => {
                setIsShow(prevState => !prevState)
            }} mode='outlined'>Choose Date</Button>

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

                }}>{itemID ? 'Update' : 'Save'}</Button>
            </View>
        </View>
    )
}