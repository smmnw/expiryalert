import {useQuery} from "@tanstack/react-query";
import {useSqlite} from "../SQLiteProvider";
import * as SQLite from "expo-sqlite";

interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}

const expiresFetch = async (db: SQLiteContextType) => {
    const currentDate =new Date().getTime()
    const result = await db.db?.getAllAsync(`SELECT * FROM records where date >= ?`,currentDate)
    return result
}


export function useExpiresFetch() {
    const db = useSqlite()
    return useQuery({
        queryFn: () => expiresFetch(db),
        queryKey: ['expires'],
    })
}