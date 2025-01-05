export default function DateToDaysLeft(targetDate: Date): number {
    const today = new Date()
    const difference = targetDate.getTime() - today.getTime()
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24))
    return daysLeft
}