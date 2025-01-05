import {useMutation} from "@tanstack/react-query";
import {useSqlite} from "../SQLiteProvider";
import * as SQLite from "expo-sqlite";

interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}

const expireDelete = async (db: SQLiteContextType, id: any) => {
    const result = await db.db?.runAsync(`DELETE FROM records WHERE id =?`,id)
    return result
}

export default function useExpireDelete() {
    const db = useSqlite()
    return useMutation({
        mutationFn: ({id}:{id:number|undefined}) => expireDelete(db, id),
        mutationKey: ['expires']
    })
}