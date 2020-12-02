console.log("JS Connected");

/**
 * 
 * Utility methods for managing time
 * 
 * @object timeUtilities
 * 
 * @method  getToday
 * @returns {object} object.unix                Unix Time
 * @returns {object} object.humanReadableDate   Eg. Friday, October 30th, 2020
 * 
 * @method  getCurrentHour
 * @returns {object} object.militaryTime        0..23
 * 
 * 
 */
var timeUtilities = {
    getToday: () => {
        let now = moment.now();
        return {
            unixTime: moment(now).unix(),
            humanReadableDate: moment(moment.now()).format("dddd, MMMM Do, YYYY")
        }
    },
    getCurrentHour: () => {
        let now = moment.now();
        return {
            militaryTime: parseInt(moment(now).format("H")) // 0..23
        }
    }
}

/**
 * Render today's date under the title
 * 
 * @function renderTodaysDate
 */
function renderTodaysDate() {
    let humanReadableDate = timeUtilities.getToday().humanReadableDate
    $("#currentDay").text(humanReadableDate);
}

/**
 * Render all the time-blocks from 9am to 5pm without coloring past/present/future yet.
 * 
 * @function renderTimeblocks
 */
function renderTimeblocks() {
    function renderTimeblock(objectHours) {
        var template = $("#template-time-block").clone().html();
        var parameterizedTemplate = Handlebars.compile(template);
        var generatedHtml = parameterizedTemplate(objectHours);
        $(".time-blocks").append(generatedHtml);
    }
    renderTimeblock({ militaryHour: "9", regularHour: "9AM" });
    renderTimeblock({ militaryHour: "10", regularHour: "10AM" });
    renderTimeblock({ militaryHour: "11", regularHour: "11AM" });
    renderTimeblock({ militaryHour: "12", regularHour: "12PM" });
    renderTimeblock({ militaryHour: "13", regularHour: "1PM" });
    renderTimeblock({ militaryHour: "14", regularHour: "2PM" });
    renderTimeblock({ militaryHour: "15", regularHour: "3PM" });
    renderTimeblock({ militaryHour: "16", regularHour: "4PM" });
    renderTimeblock({ militaryHour: "17", regularHour: "5PM" });

} // renderTimeblocks

/**
 * Colors the time blocks based on whether they are past, present, or future hours,
 * by iterating through all time blocks and resetting their colors by removing styling
 * classes past, present, and future, then adding the appropriate style class based on
 * comparing the current hour against the hour on the time-block.
 * 
 * @function colorTimeblocks
 * 
 */
function colorTimeblocks() {
    $(".time-block").each((i, timeBlock) => {
        let $timeBlock = $(timeBlock);
        $timeBlock.removeClass("past present future");
        var timeBlockHour = parseInt($timeBlock.children(".hour").attr("data-military-hour"));
        var currentHour = timeUtilities.getCurrentHour().militaryTime;
        if (currentHour > timeBlockHour) {
            $timeBlock.addClass("past");
        } else if (currentHour === timeBlockHour) {
            $timeBlock.addClass("present");
        } else {
            $timeBlock.addClass("future");
        }
    });
}
/**
 * When user clicks save icon, saves the task for that hour to localStorage.
 * 
 * @function saveTimeblock
 * @param {event}           The event.target gets the save icon element, then 
 *                          traverse up to get the time-block row. Finally, 
 *                          traverse back down to get the hour and task cells.
 *                          Then their data can be saved to localStorage.
 */
function saveTimeblock(event) {
    let $saveIcon = $(event.target);
    let $description = $saveIcon.closest(".time-block").find(".description");
    let $hour = $saveIcon.closest(".time-block").find(".hour");

    let hour = $hour.data("military-hour"); // Eg. 9AM
    let description = $description.text(); // eg. Task
    localStorage.setItem(hour, description);

    console.dir({ description, hour });
    alert(`Saved event "${description}" for ${hour}:00.`);
}

/**
 * Load time block tasks from localStorage by using a for-loop on localStorage keys
 * that are military hours and match them against data-military-hour attributes
 * that belong to time blocks. For all matches, change the task description at the time blocks.
 * 
 * @function loadTimeblockTasks
 * 
 */
function getTimeblockTasks() {
    for (var i = 0; i < localStorage.length; i++) {
        let savedHour = localStorage.key(i); // 9..17
        let associatedTask = localStorage.getItem(savedHour); // Task
        let $associatedTaskEle = $(`.hour[data-military-hour="${savedHour}"]`).closest(".time-block").find(".description");
        $associatedTaskEle.text(associatedTask);
    }
}