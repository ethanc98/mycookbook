const steps = document.querySelector(".steps");

// tracks successive step number
let num = 1;

// listens for addStep call
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', function () {
    const stepValue = 'newStep';
    storeAndUpdate(stepValue);
});

// listens for remove step call
steps.onclick = async (e) => {
    if (e.target.tagName !== 'BUTTON' || e.target.value == 1) {
        return;
    }
    const target = e.target;
    const stepValue = target.value;
    await target.parentElement.remove();
    num = num - 1;
    storeAndUpdate(stepValue);
};

// stores textarea values, then either 1.creates new step and reintroduces values or 2.reintroduces values to reorganised list after a step deletion
const storeAndUpdate = (stepValue) => {
    const btns = steps.getElementsByTagName('button');
    const txt = steps.getElementsByTagName('textarea');
    const textValue = [];
    for (let i = 0; i < btns.length; i++) {
        textValue[i] = txt[i].value;
    }
    if (stepValue === 'newStep') {
        createStep(btns, textValue, txt)
    } else {
        updateHTML(btns, textValue, txt, stepValue)
    }
};

// adds new step
const createStep = (btns, textValue, txt) => {
    num = num + 1;
    const newStep = `<div class="step" id="step${num}Div">
        <input id="number${num}" name="recipe[steps][${num}][number]" type="hidden" value="${num}">
        <label class="step__label" for="step${num}">Step ${num}: </label>
        <textarea class="input" type="text" id="step${num}" name="recipe[steps][${num}][step]" required></textarea>
        <button class="button button_white button_delete" type="button" id="deleteStep${num}" value="${num}">x</button>
        </div>`;
    steps.innerHTML += newStep;
    textValue[num - 1] = '';
    for (let i = 0; i < btns.length; i++) {
        txt[i].value = textValue[i]
    }
};

// updates HTML with new step postion
const updateHTML = (btns, textValue, txt, stepValue) => {
    for (let i = 0; i < btns.length; i++) {
        const parsedValue = Number(btns[i].value);
        if (parsedValue > stepValue) {
            j = (btns[i].value) - 1;
            btns[i].parentElement.outerHTML = `<div class="step" id="step${j}Div">
            <input id="number${j}" name="recipe[steps][${j}][number]" type="hidden" value="${j}">
            <label class="step__label" for="step${j}">Step ${j}: </label>
            <textarea class="input" type="text" id="step${j}" name="recipe[steps][${j}][step]" required></textarea>
            <button class="button button_white button_delete" type="button" id="deleteStep${j}" value="${j}">x</button>
            </div>`;
        }
    } for (let i = 0; i < btns.length; i++) {
        txt[i].value = textValue[i]
    }
};