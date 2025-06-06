// Set the birthday date (June 7, 2025)
const birthdayDate = new Date('2025-06-07T00:00:00');

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const openLetterButton = document.getElementById('open-letter');
const countdownSection = document.getElementById('countdown-section');
const letterSection = document.getElementById('letter-section');

// Background Music
const bgMusic = document.getElementById('bgMusic');

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

// Function to hide all dialogs
function hideAllDialogs() {
    letterSection.classList.add('fade-out');
    giftDialog.classList.add('fade-out');
    watchDialog.classList.add('fade-out');
    
    setTimeout(() => {
        letterSection.classList.add('hidden');
        giftDialog.classList.add('hidden');
        watchDialog.classList.add('hidden');
        countdownSection.classList.remove('hidden');
        
        // Remove fade-out class after hiding
        letterSection.classList.remove('fade-out');
        giftDialog.classList.remove('fade-out');
        watchDialog.classList.remove('fade-out');
    }, 500);
}

// Function to animate stickers sequentially
function animateStickers() {
    const stickers = document.querySelectorAll('.sticker');
    let delay = 0;
    
    stickers.forEach((sticker, index) => {
        setTimeout(() => {
            sticker.classList.add('animate');
        }, delay);
        delay += 200; // 200ms delay between each sticker
    });
    
    // Return the total animation duration
    return delay + 500; // Add 500ms for the last sticker's animation
}

// Handle letter reveal
openLetterButton.addEventListener('click', () => {
    // First animate stickers
    const animationDuration = animateStickers();
    
    // Then show the letter after stickers animation
    setTimeout(() => {
        countdownSection.classList.add('hidden');
        letterSection.classList.remove('hidden');
        letterSection.style.animation = 'fadeIn 1s ease-in';
    }, animationDuration);
});

// Handle gift button click
const openGiftButton = document.getElementById('open-gift');
const giftDialog = document.getElementById('gift-dialog');

openGiftButton.addEventListener('click', () => {
    letterSection.classList.add('hidden');
    giftDialog.classList.remove('hidden');
    giftDialog.style.animation = 'fadeIn 1s ease-in';
});

// Handle watch gift reveal
const openWatchButton = document.getElementById('open-watch');
const watchDialog = document.getElementById('watch-dialog');

openWatchButton.addEventListener('click', () => {
    giftDialog.classList.add('hidden');
    watchDialog.classList.remove('hidden');
    watchDialog.style.animation = 'fadeIn 1s ease-in';
});

// Handle close buttons
const closeButtons = document.querySelectorAll('.close-button');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideAllDialogs();
    });
});

// Handle WhatsApp button click
const whatsappButton = document.querySelector('.whatsapp-button');
whatsappButton.addEventListener('click', () => {
    // Close all dialogs after a short delay
    setTimeout(() => {
        hideAllDialogs();
    }, 500);
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

// Function to play background music
function playBackgroundMusic() {
    bgMusic.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });
}

// Play music when user interacts with the page
document.addEventListener('click', function() {
    playBackgroundMusic();
}, { once: true }); 