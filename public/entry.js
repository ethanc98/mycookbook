// allows use of enter_key for changing targets (applied to username input only)
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 && event.target.id === 'username') {
        var form = event.target.form;
        var index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
});

// innerHeight used to avoid softkeyboard-viewport shrinkage
const getHeight = () => {
    const margin = document.querySelector('.margin');
    margin.style.height=`${window.innerHeight}px`;
}
window.addEventListener('load', (event) => {
    if (window.innerWidth>500) {
        getHeight();
    } else {
        setTimeout(getHeight, 100);
    }
});