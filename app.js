// Get all the buttons in the top bar
const buttons = document.querySelectorAll('#top-bar ul li a');

// Function to handle button click
function handleButtonClick(event) {
    // Remove 'active' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the clicked button
    event.target.classList.add('active');
}

// Attach click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// You can add more JavaScript functionality here as needed
