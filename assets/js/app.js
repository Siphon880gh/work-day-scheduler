console.log("JS Connected");

/**
 * 
 * Utility methods for managing time
 * 
 * @object TimeUtilities
 * 
 * @method  getToday
 * @returns {object} object.unix            Unix Time
 * @returns {object} object.humanReadable   Eg. Friday, October 30th, 2020
 * 
 * @method  getCurrentHour
 * @returns {object} object.militaryTime    0..23
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
    },
    getCurrentHour: () => {
        let now = moment.now();
        return {
            militaryTime: parseInt(moment(now).format("H")) // 0..23
        }
    }
}

function renderTodaysDate() {
    let humanReadableDate = TimeUtilities.getToday().humanReadableDate
    $("#currentDay").text(humanReadableDate);
}

function renderTimeblocks() {
    function renderTimeblock(objectHours) {
        var template = $("#template-time-block").clone().html();
        var parameterizedTemplate = Handlebars.compile(template);
        var generatedHtml = parameterizedTemplate(objectHours);
        $(".time-blocks").append(generatedHtml);
    }
    renderTimeblock({militaryHour:"1", regularHour:"1AM"});
    renderTimeblock({militaryHour:"9", regularHour:"9AM"});
    renderTimeblock({militaryHour:"10", regularHour:"10AM"});
    renderTimeblock({militaryHour:"11", regularHour:"11AM"});
    renderTimeblock({militaryHour:"12", regularHour:"12PM"});
    renderTimeblock({militaryHour:"13", regularHour:"1PM"});
    renderTimeblock({militaryHour:"14", regularHour:"2PM"});
    renderTimeblock({militaryHour:"15", regularHour:"3PM"});
    renderTimeblock({militaryHour:"16", regularHour:"4PM"});
    renderTimeblock({militaryHour:"17", regularHour:"5PM"});

} // renderTimeblocks

function colorTimeblocks() {
    $(".time-block").each( (i,timeBlock)=>{ 
        let $timeBlock = $(timeBlock);
        $timeBlock.removeClass("past present future");
        var timeBlockHour = parseInt($timeBlock.children(".hour").attr("data-military-hour"));
        var currentHour = TimeUtilities.getCurrentHour().militaryTime;
        if(currentHour > timeBlockHour) {
            $timeBlock.addClass("past");
        } else if(currentHour === timeBlockHour) {
            $timeBlock.addClass("present");
        } else {
            $timeBlock.addClass("future");
        }
     });
}

function saveTimeblock(event) {
    let $saveIcon = $(event.target);
    let $description = $saveIcon.closest(".time-block").find(".description");
    let $hour = $saveIcon.closest(".time-block").find(".hour");

    let hour = $hour.data("military-hour"); // Eg. 9AM
    let description = $description.text(); // eg. Task
    localStorage.setItem(hour, description);

    console.dir({description, hour});
}

/**
 * Iterate through all timeblock data that are saved to localStorage
 * and set the text the appropriate timeblock rows
 * 
 * @function loadTimeblockTasks
 * 
 */
function loadTimeblockTasks() {
    for (var i = 0; i < localStorage.length; i++){
        let savedHour = localStorage.key(i); // 9..17
        let associatedTask = localStorage.getItem( savedHour ); // Task
        let $associatedTaskEle = $(`.hour[data-military-hour="${savedHour}"]`).closest(".time-block").find(".description");
        $associatedTaskEle.text(associatedTask);
    }
}