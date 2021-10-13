const setTime = () => {
    var dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    $("#currentDay").text(dateTime);
}
setInterval(setTime, 1000);