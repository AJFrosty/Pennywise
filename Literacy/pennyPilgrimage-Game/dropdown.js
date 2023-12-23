function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('active')) {
                openDropdown.classList.remove('active');
            }
        }
    }
}
