// Function to show a specific section and hide others
function showSection(sectionId) {
    // Get all sections except the introduction
    var sections = document.querySelectorAll('.content-section');
    
    // Hide all sections
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    // Show the selected section
    var sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }
}

// Optionally, you can leave this out if you don't want any section to show by default
 document.addEventListener('DOMContentLoaded', function() {
     showSection('intro'); // No section will be shown by default
}
);
