document.addEventListener("DOMContentLoaded", function() {
    const accordions = document.querySelectorAll('.accordion');

    // Add event listeners for accordion menus
    accordions.forEach(function(accordion) {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active-menu-button');
            const submenu = this.nextElementSibling;
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            const arrowIcon = this.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.classList.toggle('fa-chevron-right');
                arrowIcon.classList.toggle('fa-chevron-down');
            }
        });
    });

    const sidebarShowBtn = document.getElementById('sidebarShowBtn');
    const sidebarHideBtn = document.getElementById('sidebarHideBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    // Initially set button visibility based on screen width
    toggleButtonVisibility();

    // Add event listener for window resize to update button visibility
    window.addEventListener('resize', toggleButtonVisibility);

    // Function to toggle button visibility based on screen width
    function toggleButtonVisibility() {
        if (window.innerWidth <= 768 ) {
            sidebarShowBtn.style.display = 'block';
            sidebarHideBtn.style.display = 'block';
            mainContent.style.marginLeft = '0';
        } else {
            sidebarShowBtn.style.display = 'none';
            mainContent.style.marginLeft = '250px';
            sidebarHideBtn.style.display = 'none';
        }
    }

    // Add event listeners for sidebar buttons
    sidebarShowBtn.addEventListener('click', showSidebar);
    sidebarHideBtn.addEventListener('click', hideSidebar);

    // Function to show sidebar
    function showSidebar() {
        sidebar.classList.toggle('show');
        sidebar.classList.toggle('sidebar-visible');
        sidebarShowBtn.style.display = 'none';
    }

    // Function to hide sidebar
    function hideSidebar() {
        sidebar.classList.toggle('show');
        sidebar.classList.toggle('sidebar-visible');
        sidebarShowBtn.style.display = 'block';
    }

    let dragScreenElement = null;

    function handleDragStart(e) {
        this.style.opacity = "0.4";
        dragScreenElement = this;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";

        // Remove any existing 'over' class from other items
        const existingOver = document.querySelector('.over');
        if (existingOver) {
            existingOver.classList.remove('over');
        }

        // Add 'over' class to the current drop target
        this.classList.add("over");

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add("over");
    }

    function handleDragLeave(e) {
        this.classList.remove("over");
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        if (dragScreenElement !== this) {
            dragScreenElement.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData("text/html");
        }
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = "1";
        items.forEach(function (item) {
            item.classList.remove("over");
        });
    }

    let items = document.querySelectorAll(".panel");
    items.forEach(function (item) {
        item.addEventListener("dragstart", handleDragStart, false);
        item.addEventListener("dragenter", handleDragEnter, false);
        item.addEventListener("dragover", handleDragOver, false);
        item.addEventListener("dragleave", handleDragLeave, false);
        item.addEventListener("drop", handleDrop, false);
        item.addEventListener("dragend", handleDragEnd, false);
    });
});