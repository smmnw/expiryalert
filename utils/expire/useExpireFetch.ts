import * as SQLite from "expo-sqlite";
import {useMutation} from "@tanstack/react-query";
import {useSqlite} from "../SQLiteProvider";

interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}


const expireFetch = async (db: SQLiteContextType, id:any) => {
  const result = await  db.db?.getFirstAsync(`SELECT * FROM records WHERE id= ?`,id)
    return result
}


export function useExpireFetch() {
    let db = useSqlite()
    return useMutation({
        mutationFn: ({id}: {id:number|undefined}) => expireFetch(db, id),
        mutationKey: ['expire']
    })
}