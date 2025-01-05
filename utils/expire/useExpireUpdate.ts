import * as SQLite from "expo-sqlite";
import {useMutation} from "@tanstack/react-query";
import {useSqlite} from "../SQLiteProvider";

interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}

interface Expire {
    id: number,
    date: Date,
    name: string,
    category: string
}

const expireUpdate = async (db: SQLiteContextType, {id,name,date,category}: Expire) => {
    const result = await  db.db?.runAsync(`UPDATE records SET date =? ,name=?,category=? WHERE id=?`,[date.getTime(),name,category,id])
    return result
}


export function useExpireUpdate() {
    let db = useSqlite()
    return useMutation({
        mutationFn: (expire: Expire) => expireUpdate(db, expire),
        mutationKey: ['expire']
    })
}