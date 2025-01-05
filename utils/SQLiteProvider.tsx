import React, { createContext, useContext, useEffect, useState} from "react";
import *as SQLite from 'expo-sqlite'
import {View,Text} from "react-native";
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

    const [db, setDB] = useState<SQLite.SQLiteDatabase>()
     const [loading,setLoading] =useState<boolean>(true)

    useEffect(() => {
        const initializeDB = async () => {

            const dbInstance = await SQLite.openDatabaseAsync('expires.db')
            setDB(dbInstance)

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

        initializeDB()
    }, [])



    if(loading){
        return  <LoadingIndicator/>
    }
    return (
        <SQLiteContext.Provider value={{db}}>
            {children}
        </SQLiteContext.Provider>
    )
}

export function useSqlite() {
    return useContext(SQLiteContext)
}