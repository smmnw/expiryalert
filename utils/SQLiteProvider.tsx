import React, { createContext, useContext, useEffect, useState} from "react";
import *as SQLite from 'expo-sqlite'
import LoadingIndicator from "../components/LoadingIndicator";

interface SQLiteContextType{
    db? : SQLite.SQLiteDatabase
}

const SQLiteContext = createContext<SQLiteContextType>({
    db : undefined
})

interface SQLiteProviderProps {
    children: React.ReactNode
}

export default function SQLiteProvider({children}: SQLiteProviderProps) {

    const [database, setDatabase] = useState<SQLite.SQLiteDatabase>()
     const [loading,setLoading] =useState<boolean>(true)

    useEffect(() => {
        const initializeDatabase = async () => {

            const dbInstance = await SQLite.openDatabaseAsync('expires.db')
            setDatabase(dbInstance)

            await dbInstance.execAsync(`
            PRAGMA journal_mode =WAL;
            CREATE TABLE IF NOT EXISTS records (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  name TEXT NOT NULL,
                                  date TEXT NOT NULL, 
                                  category TEXT NOT NULL); 
                                 `)

            setLoading(false)
        }

        initializeDatabase()
    }, [])



    if(loading){
        return  <LoadingIndicator/>
    }

    return (
        <SQLiteContext.Provider value={{db: database}}>
            {children}
        </SQLiteContext.Provider>
    )
}

export function useSqlite() {
    return useContext(SQLiteContext)
}