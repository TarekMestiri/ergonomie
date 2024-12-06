// Navbar logic: Buttons drop to the footer and return to original positions
const navLinks = document.querySelectorAll('.navLink');
const footer = document.getElementById('trickyFooter');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const isOriginal = link.dataset.original === 'true';

        if (isOriginal) {
            // Drop to footer
            link.style.position = 'absolute';
            link.style.transition = 'transform 1s ease, opacity 1s';
            link.style.transform = `translateY(${window.innerHeight - link.getBoundingClientRect().top - 50}px)`;
            link.dataset.original = 'false';
        } else {
            // Return to original position
            link.style.transform = 'none';
            link.style.position = 'relative';
            link.dataset.original = 'true';
        }
    });
});

// Footer logic: Hides the cursor on hover
footer.addEventListener('mouseover', () => {
    document.body.style.cursor = 'none';
});
footer.addEventListener('mouseout', () => {
    document.body.style.cursor = 'default';
});

// Submit button logic: Moves randomly but stays in the container
const submitButton = document.getElementById('submitButton');
let clickAttempts = 0;

function getRandomPosition() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = submitButton.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    return { x, y };
}

submitButton.addEventListener('mouseover', () => {
    if (clickAttempts < 5) {
        const { x, y } = getRandomPosition();
        submitButton.style.transform = `translate(${x}px, ${y}px)`;
    }
});

submitButton.addEventListener('click', () => {
    clickAttempts++;
    if (clickAttempts >= 5) {
        alert('Finally! You submitted the form!');
        submitButton.removeEventListener('mouseover', () => {}); // Disable dodging
    } else {
        alert(`Nice try! ${5 - clickAttempts} attempts left.`);
    }
});
