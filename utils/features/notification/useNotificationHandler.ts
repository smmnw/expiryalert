import * as Notification from "expo-notifications";
import {Platform}from 'react-native'

export const registerNotification = async () => {

    if(Platform.OS==='android'){
        await Notification.setNotificationChannelAsync('default',{
            name:'default',
            importance:Notification.AndroidImportance.HIGH
        })
    }

    Notification.setNotificationHandler({
        handleNotification: async () => (
            {
                shouldPlaySound: true,
                shouldSetBadge: true,
                shouldShowAlert: true
            })
    })

}

export const requestNotification = async () => {
    const {status} = await Notification.requestPermissionsAsync()
    return status==='granted'
}

export const showNotification = async (name: string,time:string) => {
    if(await requestNotification()){
        await Notification.scheduleNotificationAsync({
            content: {
                title: 'Expiration Reminder',
                body: `${name} will expire in ${time} days.`
            },
            trigger: null
        })
    }
}


