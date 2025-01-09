import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import {showNotification} from './useNotificationHandler'
import * as SQLite from "expo-sqlite";
import {fetchCounterData} from "../../StorageUtils";
import {addDaysToDate, formatDateToISO} from "../../OtherUtils";

const BACKGROUND_CHECK_NOTIFICATION = "BACKGROUND_CHECK_NOTIFICATION"


TaskManager.defineTask(BACKGROUND_CHECK_NOTIFICATION, async () => {
    try {
        const dbInstance = await SQLite.openDatabaseAsync('expires.db')
        const date = await fetchCounterData()
           //@ts-ignore
        const updatedDate = addDaysToDate(formatDateToISO(new Date()), parseInt(date))
        const result = await dbInstance.getAllAsync(`SELECT *
                                                     FROM records
                                                     WHERE BETWEEN ? AND ?`, updatedDate,formatDateToISO(new Date()))
         // @ts-ignore
        const updateResult = result.map(item => item.name).join()
        //@ts-ignore
         showNotification(updateResult, date)
        return BackgroundFetch.BackgroundFetchResult.NewData
    } catch (e) {
        return BackgroundFetch.BackgroundFetchResult.Failed
    }


})

export async function registerBackgroundCheckNotification() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_CHECK_NOTIFICATION, {
        minimumInterval: 1 * 60,
        stopOnTerminate: false,
        startOnBoot: true
    })
}