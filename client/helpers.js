export const formatMonthAndYear = str => {
    const dateObject = new Date(str);
    const months = {
        "0": "Jan",
        "1": "Feb",
        "2": "Mar",
        "3": "Apr",
        "4": "May",
        "5": "Jun",
        "6": "Jul",
        "7": "Aug",
        "8": "Sep",
        "9": "Oct",
        "10": "Nov",
        "11": "Dec"
    };
    const currentDate = new Date();
    const present = `${months[currentDate.getMonth()]} - ${currentDate.getFullYear()}`;
    const date = `${months[dateObject.getMonth()]} - ${dateObject.getFullYear()}`;
    return (present === date ? 'present' : date);
};