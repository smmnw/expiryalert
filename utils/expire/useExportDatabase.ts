import {useQuery} from "@tanstack/react-query";
import {useSqlite} from "../SQLiteProvider";
import * as SQLite from "expo-sqlite";

interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}

const exportDatabase = async (db: SQLiteContextType) => {
    const currentDate =new Date().getTime()
    const result = await db.db?.getAllAsync(`SELECT * FROM records `,)
    return result
}


export function useExportDatabase(isEnabled:boolean) {
    const db = useSqlite()
    return useQuery({
        queryFn: () => exportDatabase(db),
        queryKey: ['expires-export'],
        enabled:isEnabled
    })
}