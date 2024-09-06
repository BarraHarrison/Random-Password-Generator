// DOM Elements
const lengthSlider = document.querySelector(".pass-length input");
const generateButton = document.querySelector(".generate-button");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span")

const characters = { // objects of letters, numbers and symbols
    lowercase: `abcdefghijklmnopqrstuvwxyz`,
    uppercase: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
    numbers: `0123456789`,
    symbols: `!@#$%^&*()_+-=[]{}|;:'",>.</`
}

function updatePassIndicator() {
    if(lengthSlider.value <= 8) {
        passIndicator.id = "weak";
    } else if(lengthSlider.value <= 16) {
        passIndicator.id = "medium";
    } else {
        passIndicator.id = "strong";
    }
}


function updateSlider () {
    // we pass the slider's value through the span 
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

function generatePassword() {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value; // Passing slider value to passLength

    options.forEach(option => {
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                // adding a key value from the character object variable to the staticPassword
                    staticPassword += characters[option.id];
            } else if(option.id === "spaces") { // adds spaces if checkbox is checked
                    staticPassword += ` `;
            } else { // pass "true" to exclude duplicate
                excludeDuplicate = true;
            }
        }
    });
        for (let i = 0; i < passLength; i++) {
            // getting random character from the static password
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            if(excludeDuplicate) {
                // if randomPassword does not contain the current random character
                // decrement by -1
                if (!randomPassword.includes(randomChar) || randomChar === " ") {
                    randomPassword += randomChar;
                } else {
                    i--;
                }
            } else {
                randomPassword += randomChar;
            }
        }
        passwordInput.value = randomPassword; // passing randomPassword to passwordInput
    }


function copyPassword() {
    // writeText writes the passed text to the system clipboard
    navigator.clipboard.writeText(passwordInput.value); // copying random password
    copyIcon.innerText = "check"; // changing copy icon to a check
    setTimeout(() => { 
        copyIcon.innerText = "copy"; // changes the check icon back to a copy
    }, 1500);
}

lengthSlider.addEventListener("input", updateSlider);
generateButton.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
