import {View,AppState} from "react-native";
import {FAB, SegmentedButtons} from 'react-native-paper'
import ExpiresList from "../components/ExpiresList";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useExpiresFetch} from "../utils/expire/useExpiresFetch";
import {useEffect, useState} from "react";
import useExpireFilterFetch from "../utils/expire/useExpireFilterFetch";
import ItemNotFound from "../components/ItemNotFound";
import LoadingIndicator from "../components/LoadingIndicator";
import {StatusBar} from "expo-status-bar";
import {requestNotification,registerNotification} from '../utils/features/notification/useNotificationHandler'
import {registerBackgroundCheckNotification} from '../utils/features/notification/BackgroundTask'
import {fetchCounterData, saveCounterValue} from "../utils/StorageUtils";

interface Expire {
    id: number,
    date: Date,
    name: string,
    category: string
}

export default function ExpireScreen() {
    const navigation = useNavigation()
    const {data, isLoading, refetch} = useExpiresFetch()
    const {mutate: filterFun, data: expiredData} = useExpireFilterFetch()
    const [expiresData, setExpiresData] = useState<Expire[]>([])
    const [filter, setFilter] = useState<string>('')
    const isFocused = useIsFocused()



    useEffect(() => {
      const listener=  AppState.addEventListener('change',nextState =>{
          if(nextState==='background'){
              registerBackgroundCheckNotification()
          }
        })
        return ()=> {
            listener.remove()
        }
    }, [AppState]);

    useEffect(() => {
        const initializeCounter = async () => {
            const data = await fetchCounterData()
            if (!data) {
                      await saveCounterValue('3')
            }
        }
        initializeCounter()
    }, []);

    useEffect(() =>{
           registerNotification()
         requestNotification()

    }, []);


    useEffect(() => {
        if(filter==='expired'){
            filterFun()
        }else{
            refetch()
        }
    }, [isFocused,filter]);


    useEffect(() => {
        let newData: any
        if (filter === 'expired') {
            newData = expiredData
        } else {
            newData = data
        }

        const updatedData = newData ? newData.map((item: any) => ({
            id: item.id,
            date: new Date(item.date),
            name: item.name,
            category: item.category,
        })) : [];

        setExpiresData(prevState => {
            if (filter === 'descending') {
                return [...updatedData].sort((a, b) => b.date.getTime() - a.date.getTime())
            } else if (filter === 'ascending') {
                return [...updatedData].sort((a, b) => a.date.getTime() - b.date.getTime())
            }

            return updatedData
        })
    }, [data, expiredData, filter])

    const handleSegmentButtonClick = (type: string):void => {
        setFilter(type)
        switch (type) {
            case 'ascending':
                setExpiresData((prevData) =>
                    [...prevData].sort((a, b) => a.date.getTime() - b.date.getTime())
                );

                break
            case 'descending':
                setExpiresData((prevData) =>
                    [...prevData].sort((a, b) => b.date.getTime() - a.date.getTime())
                );
                break
            case 'expired':
                filterFun()

                break
            default:
                break
        }

    }

    const handleExpireItemClick = (id: number):void => {
        //@ts-ignore
       navigation.navigate('ExpireAddScreen',{itemID:id})
    }


    if (isLoading) {
        return <LoadingIndicator/>
    }


    return (
        <View style={{flex: 1}}>
            <StatusBar style='light'/>
            <SegmentedButtons
                value={filter}
                onValueChange={handleSegmentButtonClick}
                buttons={
                    [
                    {
                        value: 'ascending',
                        label: 'Ascending',
                        icon: 'arrow-down-drop-circle-outline',
                    },
                    {
                        value: 'descending',
                        label: 'Descending',
                        icon: 'arrow-up-drop-circle-outline'
                    },
                    {
                        value: 'expired',
                        label: 'Expired',
                        icon: 'alert-circle-outline'
                    },
                ]}

                style={{
                    margin: 8,
                }}
            />


            {expiresData.length === 0 ? <ItemNotFound/> : <ExpiresList expires={expiresData} expireItemClickListener={handleExpireItemClick}/>}
            <FAB
                icon="plus"
                style={{
                    position: 'absolute',
                    margin: 20,
                    right: 0,
                    bottom: 0,
                }}
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate('ExpireAddScreen')
                }}
            />
        </View>
    )
}