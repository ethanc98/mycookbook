const ings = document.querySelector(".ingredients");

// tracks successive ing (ingredient) number
let ingNum = 1;

// listens for addStep call
const addButtonIng = document.getElementById('addButtonIng');
addButtonIng.addEventListener('click', function () {
    const ingValue = 'newIng';
    console.log('woroorks');
    storeAndUpdateIng(ingValue);
});

// listens for remove ing (ingredient) call
ings.onclick = async (e) => {
    if (e.target.tagName !== 'BUTTON') {
        console.log('Something else clicked...');
        return;
    }
    const target = e.target;
    const ingValue = target.value;
    await target.parentElement.remove();
    ingNum = ingNum - 1;
    storeAndUpdateIng(ingValue);
};

// stores input values, then either 1.creates new ing and reintroduces values or 2.reintroduces values to reorganised list after a new deletion
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

// adds new ing (ingredient)
const createIng = (btns, textValue, txt) => {
    ingNum = ingNum + 1;
    const newIng = `<div class="ingredient" id="ing${ingNum}Div">
        <input name="recipe[ingredients][${ingNum}][number]" type="hidden" value="${ingNum}">
        <input class="input" type="text" id="ing${ingNum}" name="recipe[ingredients][${ingNum}][ingredient]" required>
        <button class="button button_white button_delete" type="button" id="deleteIng${ingNum}" value="${ingNum}">x</button>
        </div>`;
    ings.innerHTML += newIng;
    textValue[ingNum - 1] = '';
    for (let i = 0; i < btns.length; i++) {
        txt[i].value = textValue[i]
    }
};

// updates HTML with new ing (ingredient) postion
const updateHTMLIng = (btns, textValue, txt, ingValue) => {
    for (let i = 0; i < btns.length; i++) {
        const parsedValue = Number(btns[i].value);
        if (parsedValue > ingValue) {
            j = (btns[i].value) - 1;
            btns[i].parentElement.outerHTML = `<div class="ingredient" id="ing${j}Div">
            <input id="number${j}" name="recipe[ingredients][${j}][ingredient]" type="hidden" value="${j}">
            <input class="input" type="text" id="ing${j}" name="recipe[ingredients][${j}][ingredient]" required>
            <button class="button button_white button_delete" type="button" id="deleteIng${j}" value="${j}">x</button>
            </div>`;
            console.log(i)
        }
    } for (let i = 0; i < btns.length; i++) {
        txt[i].value = textValue[i]
    }
};