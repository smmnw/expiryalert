import {View} from "react-native";
import {FAB, SegmentedButtons} from 'react-native-paper'
import ExpiresList from "../components/ExpiresList";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useExpiresFetch} from "../utils/expire/useExpiresFetch";
import {useEffect, useState} from "react";
import useExpireFilterFetch from "../utils/expire/useExpireFilterFetch";
import ItemNotFound from "../components/ItemNotFound";
import LoadingIndicator from "../components/LoadingIndicator";


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
            date: new Date(parseInt(item.date)),
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


    if (isLoading) {
        return <LoadingIndicator/>
    }


    const segmentedButtonHandler = (type: string):void => {
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

    const expireItemClickListener = (id: number):void => {
        //@ts-ignore
       navigation.navigate('ExpireAddScreen',{itemID:id})
    }

    return (
        <View style={{flex: 1}}>
            <SegmentedButtons
                value={filter}
                onValueChange={segmentedButtonHandler}
                buttons={[

                    {
                        value: 'ascending',
                        label: 'Ascending',
                    },
                    {
                        value: 'descending',
                        label: 'Descending'
                    },
                    {
                        value: 'expired',
                        label: 'Expired'
                    },
                ]}
                style={{
                    margin: 8
                }}
            />


            {expiresData.length === 0 ? <ItemNotFound/> : <ExpiresList expires={expiresData} expireItemClickListener={expireItemClickListener}/>}
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