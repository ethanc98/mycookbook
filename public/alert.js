const form = document.getElementById('delete');

console.log(form);
form.addEventListener('click', (e) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
    } else {
        e.preventDefault();
    }
})