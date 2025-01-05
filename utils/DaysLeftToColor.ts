export default function DaysLeftToColor(daysLeft:number):string {

    if(daysLeft> 7){
        return 'green'
    }else if(daysLeft <=7 && daysLeft >3 ){
        return 'orange'
    }else {
        return 'red'
    }

}