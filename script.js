// Set the birthday date (June 7, 2025)
const birthdayDate = new Date('2025-05-25T20:17:00');

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const openLetterButton = document.getElementById('open-letter');
const countdownSection = document.getElementById('countdown-section');
const letterSection = document.getElementById('letter-section');

function updateCountdown() {
    const currentDate = new Date();
    const difference = birthdayDate - currentDate;

    if (difference <= 0) {
        // Birthday has arrived
        countdownSection.querySelector('.countdown-container').style.display = 'none';
        openLetterButton.classList.remove('hidden');
        return;
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update DOM elements
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Handle letter reveal
openLetterButton.addEventListener('click', () => {
    countdownSection.classList.add('hidden');
    letterSection.classList.remove('hidden');
    
    // Add animation to the letter
    letterSection.style.animation = 'fadeIn 1s ease-in';
});

// Handle gift button click
const openGiftButton = document.getElementById('open-gift');
const giftDialog = document.getElementById('gift-dialog');

openGiftButton.addEventListener('click', () => {
    letterSection.classList.add('hidden');
    giftDialog.classList.remove('hidden');
    
    // Add animation to the voucher
    giftDialog.style.animation = 'fadeIn 1s ease-in';
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style); 