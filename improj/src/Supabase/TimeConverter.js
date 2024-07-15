import { differenceInMilliseconds, formatDistance } from "date-fns";

export default function ConvertDate(date){

    const timestampDate = new Date(date);
    const currentDateTime = new Date();
    const elapsedMilliseconds = differenceInMilliseconds(currentDateTime, timestampDate);
    let elapsed = formatDistance(currentDateTime, timestampDate, { addSuffix: false });
    
    if (elapsed.startsWith('about ')) {
        elapsed = elapsed.replace('about ', '');
    }
    
    return elapsed;
}