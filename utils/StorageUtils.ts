import AsyncStorage from "@react-native-async-storage/async-storage";

const COUNTER = 'counter'

export async function saveCounterValue(data: string) {
    await AsyncStorage.setItem(COUNTER, data)
}


export async function fetchCounterData() {
    const result = await AsyncStorage.getItem(COUNTER)
    return result
}

