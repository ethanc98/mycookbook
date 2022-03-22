const linkDelete = document.querySelector('.link_delete');
const linkEdit = document.querySelector('.link_edit');
const linkReturn = document.querySelector('.link_return');
const links = document.querySelector('.links');
const linksOverlay = document.querySelector('.links__overlay');
const icons = document.querySelector('.fas');

const addOpacityAndZindex = () => {
    linksOverlay.classList.add("opacity");
    linksOverlay.classList.add("z-index");
};
const removeOpacityAndZindex = () => {
    linksOverlay.classList.remove("opacity");
    linksOverlay.classList.remove("z-index");
};



linkEdit.addEventListener('mouseover', (e) => {
    addOpacityAndZindex();
    linksOverlay.classList.add("bg-orange");
    linkDelete.classList.add("hidden");
    linkReturn.classList.add("hidden");
});
linkEdit.addEventListener('mouseout', (e) => {
    removeOpacityAndZindex();
    linksOverlay.classList.remove("bg-orange");
    linkDelete.classList.remove("hidden");
    linkReturn.classList.remove("hidden");
});


linkDelete.addEventListener('mouseover', (e) => {
    addOpacityAndZindex();
    linksOverlay.classList.add("bg-red");
    linkEdit.classList.add("hidden");
    linkReturn.classList.add("hidden");
});
linkDelete.addEventListener('mouseout', (e) => {
    removeOpacityAndZindex();
    linksOverlay.classList.remove("bg-red");
    linkEdit.classList.remove("hidden");
    linkReturn.classList.remove("hidden");
});


linkReturn.addEventListener('mouseover', (e) => {
    addOpacityAndZindex();
    linksOverlay.classList.add("bg-green");
    linkDelete.classList.add("hidden");
    linkEdit.classList.add("hidden");
});
linkReturn.addEventListener('mouseout', (e) => {
    removeOpacityAndZindex();
    linksOverlay.classList.remove("bg-green");
    linkDelete.classList.remove("hidden");
    linkEdit.classList.remove("hidden");
});