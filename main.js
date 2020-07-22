// Variables
const date = new Date();
const habitList = document.querySelector('.habit-list');

// Functions

// Display habits
const displayHabits = () => {
    let i = 0;
    while(i < localStorage.length) {
        let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        habitList.insertAdjacentHTML("beforeend", `
            <div class="habit" id="${habit.id}">
                <h3>${habit.name}</h3>
                <h3>Added on ${habit.startDate}</h3>
                <h3 id="current-date">Today is ${date.toDateString()}</h3>
                <h1>${habit.count}</h1>
                <h3>Your record is ${habit.record} days</h3>
                <button type="button" class="button-completed" id="btn-completed">Completed</button>
            </div>
        `) 

        i++;
    }
}

// Events

// Add habit
const addHabit = document.querySelector('#btn-add-habit');
addHabit.addEventListener('click', (e) => {
    e.preventDefault();

    let habitName = document.querySelector('#habit-name').value;
    if (habitName === '') {
        habitName = 'New Habit';
    }

    let habitObject = {
        id: `${Math.floor(Math.random() * 999999999)}`,
        name: habitName,
        startDate: date.toDateString(),
        count: 0,
        record: 0
    }

    localStorage.setItem(`${habitObject.name}-${habitObject.id}`, JSON.stringify(habitObject));

    habitList.insertAdjacentHTML("beforeend", `
        <div class="habit" id="${habitObject.id}">
            <h3>${habitObject.name}</h3>
            <h3>Added on ${habitObject.startDate}</h3>
            <h3 id="current-date">Today is ${date.toDateString()}</h3>
            <h1>${habitObject.count}</h1>
            <h3>Your record is ${habitObject.record} days</h3>
            <button type="button" class="button-completed" id="btn-completed">Completed</button>
        </div>
    `)

    document.querySelector('#habit-name').value = '';
})

// Update habit
document.addEventListener('click', (e) => {
    if (e.target.id === 'btn-completed') {
        let updatedCount = 0;

        let i = 0;
        while (i < localStorage.length) {
            let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

            if (e.target.parentNode.id == habit.id) {
                habit.count = habit.count + 1;
                localStorage.setItem(localStorage.key(i), JSON.stringify(habit));

                updatedCount = habit.count;
            }

            i++;
        }

        let j = 0;
        while (j < habitList.children.length) {
            if (habitList.children[j].id == e.target.parentNode.id) {
                habitList.children[j].querySelector('h1').innerHTML = `${updatedCount}`;
                
                // implement record...
            }

            j++;
        }
    }
})

window.onload = displayHabits();