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

// Function to generate time slots for the remaining part of the day
function generateRemainingTimeSlots() {
    const timeSlots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Calculate the next available time slot based on the current time
    let nextHour = currentMinute < 30 ? currentHour : currentHour + 1;

    // Generate time slots for the remaining part of the day
    for (let i = nextHour; i < 21; i++) {
        const startTime = `${i % 12 === 0 ? 12 : i % 12}:${i % 12 === 0 ? '00' : '30'} ${i < 12 ? 'AM' : 'PM'}`;
        const endTime = `${(i + 1) % 12 === 0 ? 12 : (i + 1) % 12}:${(i + 1) % 12 === 0 ? '00' : '30'} ${(i + 1) < 12 ? 'AM' : 'PM'}`;
        timeSlots.push({ startTime, endTime, available: true });
    }

    return timeSlots;
}

// Function to display time slots for the remaining part of the day
function displayRemainingTimeSlots(deckId) {
    const deckElement = document.getElementById(deckId);

    // Check if the deck element exists
    if (deckElement) {
        const timeSlots = generateRemainingTimeSlots();

        const calendarElement = deckElement.querySelector('.calendar');

        // Clear existing content
        calendarElement.innerHTML = '';

        // Display today's date
        const today = new Date();
        const dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', dateFormatOptions);
        const dateElement = document.createElement('p');
        dateElement.innerText = `Today's Date: ${formattedDate}`;
        calendarElement.appendChild(dateElement);

        // Display time slots
        timeSlots.forEach((slot) => {
            const slotButton = document.createElement('button');
            const status = slot.available ? 'Available' : 'Not Available';
            slotButton.innerText = `${slot.startTime} - ${slot.endTime} (${status})`;

            // Style the button based on availability
            if (slot.available) {
                slotButton.classList.add('available');
                slotButton.addEventListener('click', () => reserveTimeSlot(deckId, slot.startTime, slot.endTime));
            } else {
                slotButton.classList.add('unavailable');
            }

            calendarElement.appendChild(slotButton);
        });
    }
}

// Function to reserve a time slot
function reserveTimeSlot(deckId, startTime, endTime) {
    const userEmail = prompt('Please enter your email:');
    
    if (userEmail) {
        // Simulate API call (replace with your actual API endpoint)
        const reservationAPI = 'https://example.com/reserve-spot';
        const reservationData = {
            deckId,
            startTime,
            endTime,
            userEmail,
        };

        // Placeholder function to simulate API call
        simulateApiCall(reservationAPI, reservationData)
            .then(response => {
                alert(`Reservation successful! Confirmation email sent to ${userEmail}`);
                // Mark the time slot as unavailable
                markTimeSlotAsUnavailable(deckId, startTime, endTime);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error during reservation. Please try again.');
            });
    }
}

// Placeholder function to simulate API call
function simulateApiCall(api, data) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // Resolve with a success message
            resolve({ message: 'Reservation successful!' });
        }, 1000); // Simulate a 1-second delay (replace with actual API call)
    });
}

// Function to mark a time slot as unavailable
function markTimeSlotAsUnavailable(deckId, startTime, endTime) {
    const deckElement = document.getElementById(deckId);

    if (deckElement) {
        const timeSlots = deckElement.querySelectorAll('.calendar button');
        const targetSlot = Array.from(timeSlots).find(slot => {
            const slotText = slot.innerText;
            return slotText.includes(startTime) && slotText.includes(endTime);
        });

        if (targetSlot) {
            targetSlot.classList.remove('available');
            targetSlot.classList.add('unavailable');
            target
            targetSlot.disabled = true;
            targetSlot.innerText += ' (Reserved)';
        }
    }
}

// Function to mark a time slot as reserved
function markTimeSlotAsReserved(deckId, startTime, endTime) {
    const deckElement = document.getElementById(deckId);

    if (deckElement) {
        const timeSlots = deckElement.querySelectorAll('.calendar button');
        const targetSlot = Array.from(timeSlots).find(slot => {
            const slotText = slot.innerText;
            return slotText.includes(startTime) && slotText.includes(endTime);
        });

        if (targetSlot) {
            targetSlot.classList.remove('available');
            targetSlot.classList.add('reserved');
            targetSlot.innerText = `${startTime} - ${endTime} (Reserved)`;
            targetSlot.disabled = true;
        }
    }
}

// Call the function to display time slots for each deck
displayRemainingTimeSlots('k-deck');
displayRemainingTimeSlots('m-deck');
displayRemainingTimeSlots('n-deck');
displayRemainingTimeSlots('s-deck');
displayRemainingTimeSlots('t-deck');
displayRemainingTimeSlots('u-deck');
