// Variables
const date = new Date();

let habitObject = {
    id: '',
    name: '',
    startDate: '',
    score: 0
}

const list = document.querySelector('#habit-list');
const form = document.querySelector('#habit-form');

// Functions

/* 
 * removeHabit() deletes the selected habit from localStorage and from the DOM.
 */
const removeHabit = (event) => {
    let i = 0;
    while (i < localStorage.length) {
        let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if (event.target.parentElement.parentElement.id == habit.id) {
            localStorage.removeItem(localStorage.key(i));

            let domHabit = document.querySelector(`#${event.target.parentElement.parentElement.id}`);
            domHabit.remove();
        }

        i++;
    }
}

/* 
 * completedHabit() indicates the selected habit was completed for the day. 
 * The habit's properties are updated in localStorage and the DOM.
 */
const completedHabit = (event) => {
    let updatedScore = 0;

    let i = 0;
    while (i < localStorage.length) {
        let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if (event.target.parentElement.parentElement.id == habit.id) {
            habit.score++;

            localStorage.setItem(localStorage.key(i), JSON.stringify(habit));

            updatedScore = habit.score;
        }

        i++;
    }

    let j = 0;
    let flag = false;
    while (j < list.children.length && flag !== true) {
        if (list.children[j].id == event.target.parentElement.parentElement.id) {
            list.children[j].querySelector('#habit-score').innerHTML = `Days: ${updatedScore}`;
            flag = true;
        }

        j++;
    }
}

/*
 * ongoingHabit() indicates the selected habit has not been completed for the day.
 * The habit's properties are updated in localStorage and the DOM.
 */
const ongoingHabit = (event) => {
    let updatedScore = 0;

    let i = 0;
    while (i < localStorage.length) {
        let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if (event.target.parentElement.parentElement.id == habit.id) {
            habit.score--;

            if (habit.score < 0) {
                habit.score = 0;
            }

            localStorage.setItem(localStorage.key(i), JSON.stringify(habit));

            updatedScore = habit.score;
        }

        i++;
    }

    let j = 0;
    let flag = false;
    while (j < list.children.length && flag !== true) {
        if (list.children[j].id == event.target.parentElement.parentElement.id) {
            list.children[j].querySelector('#habit-score').innerHTML = `Days: ${updatedScore}`;
            flag = true;
        }

        j++;
    }
}

/*
 * displayHabit() creates DOM elements for a habit.
 */
const displayHabit = (habit) => {
    let li = document.createElement('li');
    li.setAttribute('class', 'habit');
    li.setAttribute('id', `${habit.id}`);

    let pName = document.createElement('p');
    pName.textContent = `${habit.name}`;
    pName.setAttribute('id', 'habit-name');

    let pScore = document.createElement('p');
    pScore.textContent = `Days: ${habit.score}`;
    pScore.setAttribute('id', 'habit-score');

    let pStart = document.createElement('p');
    pStart.textContent = `Started: ${habit.startDate}`;
    pStart.setAttribute('id', 'habit-start');

    let div = document.createElement('div');
    div.setAttribute('class', 'button-container');
    
    let buttonDo = document.createElement('button');
    buttonDo.setAttribute('class', 'button-do');
    buttonDo.setAttribute('id', 'btn-do');
    buttonDo.textContent = '+';

    let buttonUndo = document.createElement('button');
    buttonUndo.setAttribute('class', 'button-undo');
    buttonUndo.setAttribute('id', 'btn-undo');
    buttonUndo.textContent = '-';

    let buttonRemove = document.createElement('button');
    buttonRemove.setAttribute('class', 'button-remove');
    buttonRemove.setAttribute('id', 'btn-remove');
    buttonRemove.textContent = 'x';

    div.appendChild(buttonDo);
    div.appendChild(buttonUndo);
    div.appendChild(buttonRemove);

    li.appendChild(pName);
    li.appendChild(pScore);
    li.appendChild(pStart);
    li.appendChild(div);

    list.appendChild(li);
}

/*
 * displayAllHabits() displays all habits in localStorage using the function displayHabit().
 * window.onload calls this function.
 */
const displayAllHabits = () => {
    let i = 0;
    while(i < localStorage.length) {
        let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

        displayHabit(habit);

        i++;
    }
}

// Events

/*
 * Listens to form submission.
 * A new habit is added to localStorage and displayed to the user.
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    habitObject.id = `id_${Math.floor(Math.random() * 1000000)}`;

    if (form.name.value === '') {
        habitObject.name = 'New Habit';
    } else {
        habitObject.name = form.name.value;
    }

    habitObject.startDate = date.toDateString();

    localStorage.setItem(habitObject.id, JSON.stringify(habitObject));

    displayHabit(habitObject);

    form.name.value = '';
})

/* 
 * Listens to the do (+), undo (-), and remove (x) buttons.
 * Calls the associated function depending on the condition.
 */
document.addEventListener('click', (e) => {
    if (e.target.id === 'btn-remove') {
        removeHabit(e);
    }

    if (e.target.id === 'btn-do') {
        completedHabit(e);
    }

    if (e.target.id === 'btn-undo') {
        ongoingHabit(e);
    }
})

// Window

window.onload = displayAllHabits();