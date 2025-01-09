import {useSqlite} from "../SQLiteProvider";
import {useMutation} from "@tanstack/react-query";
import * as SQLite from "expo-sqlite";
import {formatDateToISO} from '../OtherUtils'



interface SQLiteContextType {
    db?: SQLite.SQLiteDatabase
}

interface ExpireAdd {
    name: string,
    category: string,
    date: Date
}

const expireAdd = async (db: SQLiteContextType, {name, category, date}: ExpireAdd) => {
       const updateDate =formatDateToISO(date)

    const result = await db.db?.runAsync(`INSERT INTO records (name, date, category)
                                          VALUES (?, ?, ?)`, [name,updateDate , category])

    return result
}


export function useExpireAdd() {
    const db = useSqlite()
    return useMutation({
        mutationFn: (expire: ExpireAdd) => expireAdd(db, expire),
        mutationKey: ['expires']
    })
}

