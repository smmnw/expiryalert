import {Card, Text, useTheme} from "react-native-paper";
import {View} from "react-native";
import {dateToDaysLeft,daysLeftToColor} from "../utils/OtherUtils";

interface Expire {
    id: number,
    date: Date,
    name: string,
    category:string
}

interface ExpireItemProps {
    expire: Expire
}


export default function ExpireItem({expire}: ExpireItemProps) {
    const {colors} =useTheme()

    return (
        <View style={{flex: 1, margin: 2,backgroundColor:colors.background}}>
            <Card mode='elevated'  style={{backgroundColor:colors.surface}}>

                <Card.Title title={expire.name} />


                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: daysLeftToColor(dateToDaysLeft(expire.date)),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
                            {dateToDaysLeft(expire.date)}
                        </Text>
                    </View>


                    <View style={{marginBottom:4}}>
                        <Text>
                            Expired at
                        </Text>

                        <Text>
                            {expire.date.toLocaleDateString()}
                        </Text>
                    </View>
                </View>
            </Card>
        </View>
    )
}