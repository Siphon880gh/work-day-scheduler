console.log("JS Connected");

/**
 * 
 * Utility methods for managing time
 * 
 * @object TimeUtilities
 * @method  getToday
 * @returns {object} object.unix            Unix Time
 * @returns {object} object.humanReadable   Eg. Friday, October 30th, 2020
 * 
 * 
 */
var TimeUtilities = {
    getToday: () => {
        let now = moment.now();
        return {
            unixTime: moment(now).unix(),
            humanReadableDate: moment(moment.now()).format("dddd, MMMM Do, YYYY")
        }
    }
}

function loadTodaysDate() {
    let humanReadableDate = TimeUtilities.getToday().humanReadableDate
    $("#currentDay").text(humanReadableDate);
}

function saveTimeblock(event) {
    let $saveIcon = $(event.target);
    let $description = $saveIcon.closest(".time-block").find(".description");
    console.log($description.text());
}