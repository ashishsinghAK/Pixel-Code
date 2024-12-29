
const convertSecondsToDuration = (totalSeconds) => {


    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    
    const formattedDuration = [];
    if (hours > 0) {
        formattedDuration.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
        formattedDuration.push(`${minutes}m`);
    }
    if (seconds > 0 && hours === 0) {
        formattedDuration.push(`${seconds}s`);
    }

    return formattedDuration.join(" ");
}

module.exports = convertSecondsToDuration