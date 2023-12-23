function toggleSideMenu() {
    var sideMenu = document.getElementById("sideMenu");
    sideMenu.style.display = (sideMenu.style.display === "none" || sideMenu.style.display === "") ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
    var sideMenu = document.getElementById("sideMenu");
    var menuButton = document.querySelector(".menu-img");

    menuButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click event from reaching the document
        toggleSideMenu();
    });

    document.addEventListener("click", function (event) {
        var isClickInsideMenu = sideMenu.contains(event.target);
        if (!isClickInsideMenu) {
            sideMenu.style.display = "none";
        }
    });
});
