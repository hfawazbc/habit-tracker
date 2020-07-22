/* Variables */
const date = new Date();
const habitList = document.querySelector('.habit-list');

/* Functions */

// Display habits
const displayHabits = () => {
    let i = 0;
    while(i < localStorage.length) {
        let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        habitList.insertAdjacentHTML("beforeend", `
            <div class="habit" id="${habit.id}">
                <h1>${habit.name}</h3>
                <h1 id="habit-count">${habit.count}</h1>
                <h3>Started on ${habit.startDate}</h3>
                <h3>Today is ${date.toDateString()}</h3>
                <h3>Your record is ${habit.record} days</h3>
                <button type="button" class="button-add-count" id="btn-add-count">+</button>
                <button type="button" class="button-minus-count" id="btn-minus-count">-</button>
                <button type="button" class="button-remove-habit" id="btn-remove-habit">x</button>
            </div>
        `) 

        i++;
    }
}

/* Events */

// Add habit
const addHabit = document.querySelector('#btn-add-habit');
addHabit.addEventListener('click', (e) => {
    e.preventDefault();

    let habitName = document.querySelector('#habit-name').value.toUpperCase();
    if (habitName === '') {
        habitName = 'NEW HABIT';
    }

    let habitObject = {
        id: `num_${Math.floor(Math.random() * 999999999)}`,
        name: habitName,
        startDate: date.toDateString(),
        count: 0,
        record: 0
    }

    localStorage.setItem(`${habitObject.id}`, JSON.stringify(habitObject));

    habitList.insertAdjacentHTML("beforeend", `
        <div class="habit" id="${habitObject.id}">
            <h1>${habitObject.name}</h3>
            <h1 id="habit-count">${habitObject.count}</h1>
            <h3>Started on ${habitObject.startDate}</h3>
            <h3>Today is ${date.toDateString()}</h3>
            <h3>Your record is ${habitObject.record} days</h3>
            <button type="button" class="button-add-count" id="btn-add-count">+</button>
            <button type="button" class="button-minus-count" id="btn-minus-count">-</button>
            <button type="button" class="button-remove-habit" id="btn-remove-habit">x</button>
        </div>
    `)

    document.querySelector('#habit-name').value = '';
})

// Update habit
document.addEventListener('click', (e) => {
    if (e.target.id === 'btn-remove-habit') {
        let i = 0;
        while (i < localStorage.length) {
            let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

            if (e.target.parentNode.id == habit.id) {
                localStorage.removeItem(localStorage.key(i));

                let item = document.querySelector(`#${e.target.parentNode.id}`);
                item.remove();
            }

            i++;
        }
    }

    if (e.target.id === 'btn-add-count') {
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
                habitList.children[j].querySelector('#habit-count').innerHTML = `${updatedCount}`;
                
                // implement record...
            }

            j++;
        }
    }

    if (e.target.id === 'btn-minus-count') {
        let updatedCount = 0;

        let i = 0;
        while (i < localStorage.length) {
            let habit = JSON.parse(localStorage.getItem(localStorage.key(i)));

            if (e.target.parentNode.id == habit.id) {
                habit.count = habit.count - 1;
                
                if (habit.count < 0) {
                    habit.count = 0;
                }

                localStorage.setItem(localStorage.key(i), JSON.stringify(habit));

                updatedCount = habit.count;
            }

            i++;
        }

        let j = 0;
        while (j < habitList.children.length) {
            if (habitList.children[j].id == e.target.parentNode.id) {
                habitList.children[j].querySelector('#habit-count').innerHTML = `${updatedCount}`;
                
                // implement record...
            }

            j++;
        }
    }
})

window.onload = displayHabits();