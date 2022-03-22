const form = document.getElementById('delete');

form.addEventListener('click', (e) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
    } else {
        e.preventDefault();
    }
})