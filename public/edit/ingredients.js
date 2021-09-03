const ings = document.querySelector(".ingredients");

// tracks successive step number
let ingCount = ingNumCopy;

// listens for addStep call
const addButtonIng = document.getElementById('addButtonIng');
addButtonIng.addEventListener('click', function () {
    const ingValue = 'newIng';
    storeAndUpdateIng(ingValue);
});

// listens for remove step call
ings.onclick = async (e) => {
    if (e.target.tagName !== 'BUTTON') {
        console.log('Something else clicked...');
        return;
    }
    const target = e.target;
    const ingValue = target.value;
    await target.parentElement.remove();
    ingCount = ingCount - 1;
    storeAndUpdateIng(ingValue);
};

// stores textarea values, then either 1.creates new step and reintroduces values or 2.reintroduces values to reorganised list after a step deletion
const storeAndUpdateIng = (ingValue) => {
    const btns = ings.getElementsByTagName('button');
    const txt = ings.getElementsByClassName('input');
    const textValue = [];
    for (let i = 0; i < btns.length; i++) {
        textValue[i] = txt[i].value;
    }
    if (ingValue === 'newIng') {
        createIng(btns, textValue, txt)
    } else {
        updateHTMLIng(btns, textValue, txt, ingValue)
    }
};

// adds new step
const createIng = (btns, textValue, txt) => {
    ingCount = ingCount + 1;
    const newIng = `<div class="ingredient" id="ing${ingCount}Div">
        <input name="recipe[ingredients][${ingCount}][number]" type="hidden" value="${ingCount}">
        <input class="input" type="text" id="ing${ingCount}" name="recipe[ingredients][${ingCount}][ingredient]">
        <button class="delete-btn" type="button" id="deleteIng${ingCount}" value="${ingCount}">x</button>
        </div>`;
    ings.innerHTML += newIng;
    textValue[ingCount - 1] = '';
    for (let i = 0; i < btns.length; i++) {
        txt[i].value = textValue[i]
    }
};

// updates HTML with new step postion
const updateHTMLIng = (btns, textValue, txt, ingValue) => {
    for (let i = 0; i < btns.length; i++) {
        const parsedValue = Number(btns[i].value);
        if (parsedValue > ingValue) {
            j = (btns[i].value) - 1;
            btns[i].parentElement.outerHTML = `<div class="ingredient" id="ing${j}Div">
            <input id="number${j}" name="recipe[ingredients][${j}][ingredient]" type="hidden" value="${j}">
            <input class="input" type="text" id="ing${j}" name="recipe[ingredients][${j}][ingredient]">
            <button class="delete-btn" type="button" id="deleteIng${j}" value="${j}">x</button>
            </div>`;
            console.log(i)
        }
    } for (let i = 0; i < btns.length; i++) {
        txt[i].value = textValue[i]
    }
};