let mainElement = document.querySelector('.main');
let currentHour = moment().get('hour');

//Check for top of the hour
const checkTopOfTheHour = () => {
    if (moment().get('hours') < currentHour) {
        welcomeToANewDay();
    }

    if (moment().get('hours') > currentHour) {
        currentHour = moment().get('hour');
        weAreAtTheTopOfTheHour();
    }
}

//Moving the clock
const setTime = () => {
    var dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    $("#currentDay").text(dateTime);

    checkTopOfTheHour();
}

//Update the clock every second
setInterval(setTime, 1000);

//Welcoming a new day
const welcomeToANewDay = () => {
    mainElement.innerHTML = '<h1 style="color: green;">Good Morning!!!</h1>';
    renderTimeBlock();
}

//Updating the hourly block at the top of the hour
const weAreAtTheTopOfTheHour = () => {
    const plannerNoteElements = document.querySelectorAll('.planner-note');

    for (const element of plannerNoteElements) {
        let plannerhour = parseInt(element.getAttribute("id").substring(5));
        if (currentHour > plannerhour) {
            element.classList.remove("present");
            element.classList.remove("future");
            element.classList.add("past");
            element.readOnly = true;
        } else if (currentHour === plannerhour) {
            element.classList.remove("past");
            element.classList.remove("future");
            element.classList.add("present");
        } else {
            element.classList.remove("present");
            element.classList.remove("past");
            element.classList.add("future");
        }
    }
}

//Generate nodeId using year, month, day, and hour combination
const getNoteId = (hour) => {
    return `${moment().format("YYYY-MM-DD")}_${hour.toString()}`;
}

//Generating the hourly html block
const generateHourlyHtmlBlock = (hour, hourLabel) => {
    const noteId = getNoteId(hour);

    let note = localStorage.getItem(noteId);
    if (!note) { note = '' };

    return `
    <li class="d-flex row">
        <Label class="hour col-1">${hourLabel}</Label>
        <textarea class="col-10 past planner-note" name="" id="note_${hour}" cols="30" rows="1">${note}</textarea>
        <div class="saveBtn col-1">
            <img id="${hour}" class="save-element" src="img/save.png" alt="save icon">
        </div>
    </li>
    `;
}

//Fill in the entire time block
const generateTimeBlockContent = (content) => {
    return `
    <ul class="time-block" id="time_block">
    ${content}
    </ul>
    `;
}

//Saving the note for the hour
const saveButtonClickHandler = (event) => {
    event.preventDefault();
    const hour = event.currentTarget.getAttribute('id');
    const noteId = getNoteId(hour);
    const note = document.querySelector(`#note_${hour}`).value;
    localStorage.setItem(noteId, note);
}

//Data for initializing the time block
const getTimeBlockInitializeData = () => {
    return [{
            hour: 9,
            label: "9 AM",
        },
        {
            hour: 10,
            label: "10 AM",
        },
        {
            hour: 11,
            label: "11 AM",
        }, {
            hour: 12,
            label: "12 PM",
        }, {
            hour: 13,
            label: "1 PM",
        }, {
            hour: 14,
            label: "2 PM",
        }, {
            hour: 15,
            label: "3 PM",
        }, {
            hour: 16,
            label: "4 PM",
        },
        {
            hour: 17,
            label: "5 PM",
        },
    ];
}

//Render the time block inside the main div tag.
const renderTimeBlock = () => {
    const timeBlockData = getTimeBlockInitializeData();

    let hourlyHtmlBlocks = [];

    for (let i = 0; i < timeBlockData.length; i++) {
        hourlyHtmlBlocks.push(generateHourlyHtmlBlock(timeBlockData[i].hour, timeBlockData[i].label));
    }

    let timeBlockContent = generateTimeBlockContent(hourlyHtmlBlocks.join(''));

    mainElement.innerHTML = timeBlockContent;

    weAreAtTheTopOfTheHour();

    const saveElements = document.querySelectorAll('.save-element');
    Array.from(saveElements).forEach((element) => {
        element.addEventListener('click', saveButtonClickHandler);
    });
}

renderTimeBlock();