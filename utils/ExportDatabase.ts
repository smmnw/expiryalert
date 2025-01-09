import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import {jsonToCsv} from "./OtherUtils";

interface Expire {
    id: number,
    date: Date,
    name: string,
    category: string
}

export const shareDatabaseAsCSV = async (data: Expire[]) => {
    const csv = jsonToCsv(data)
    const fileName = "expiryalert.csv"
    const filePath = `${FileSystem.documentDirectory}${fileName}`
    await FileSystem.writeAsStringAsync(filePath, csv, {
        encoding: FileSystem.EncodingType.UTF8,
    });
    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
            mimeType: 'text/csv',
            dialogTitle: 'Share CSV File',
        });
    } else {
        console.log('Sharing is not available on this device.');
    }
}





