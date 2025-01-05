
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
const dbPath =`${FileSystem.documentDirectory}SQLite/expires.db`
export const shareDatabase= async ()=>{
try{
    if(await Sharing.isAvailableAsync()){
        await Sharing.shareAsync(dbPath,{
            mimeType:'application/x-sqlite3',
            dialogTitle:'Share Expiry Alert Database'
        })
    }
}catch (e :any){
    console.log(e.message)
}


}