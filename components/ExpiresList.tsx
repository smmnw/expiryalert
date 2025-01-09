import {FlatList, Pressable, View} from "react-native";
import ExpireItem from "./ExpireItem";


interface Expire {
    id: number,
    date: Date,
    name: string,
    category: string
}


interface ExpiresListProps {
    expires: Expire[],
    expireItemClickListener: (id: number) => void
}


const renderExpire = (item: Expire, expireItemClickListener: (id: number) => void) => {

    return (
        <Pressable style={{flex: 1}} onPress={() => {
            expireItemClickListener(item.id)
        }}>
            <ExpireItem expire={item}/>
        </Pressable>

    )
}

export default function ExpiresList({expires, expireItemClickListener}: ExpiresListProps) {


    return (
        <View>
            <FlatList
                data={expires}
                keyExtractor={(item) => JSON.stringify(item.id)}
                renderItem={({item}) => renderExpire(item, expireItemClickListener)}
                numColumns={3}
                style={{padding: 10}}/>
        </View>
    )
}