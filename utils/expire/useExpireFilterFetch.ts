import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSqlite} from "../SQLiteProvider";
import * as SQLite from "expo-sqlite";

interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}

const expireFilterFetch = async (db: SQLiteContextType) => {
 const currentDate =new Date().getTime()
    const result = await db.db?.getAllAsync(`SELECT *
                                             FROM records WHERE date < ?`,currentDate)

    return result

}

export default function useExpireFilterFetch() {
    const db = useSqlite()
    return useMutation({
        mutationFn: () => expireFilterFetch(db),
        mutationKey: ['expired']
})}