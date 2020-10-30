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
    console.log($description.text());
}