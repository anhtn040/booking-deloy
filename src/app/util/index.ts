import moment from "moment";

export const convertDateObjToTimeText = (dateObj: any) => {
    if(!dateObj) return ''
    const date = new Date(
        dateObj.year || 2024,
        dateObj.month || 1,
        dateObj.day ||1 ,
        dateObj.hour || 0,
        dateObj.minute || 0,
        dateObj.second || 0,
    );
    return moment(date).format('HH:mm:ss')
};


export const convertDateObjToDateText = (dateObj: any) => {
    if(!dateObj) return ''
    const date = new Date(
        dateObj.year,
        dateObj.month -1,
        dateObj.day,
        dateObj.hour || 0,
        dateObj.minute || 0,
        dateObj.second || 0,
    );
    return moment(date).format('YYYY-MM-DD')
};
