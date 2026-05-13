document.addEventListener("DOMContentLoaded", () => {
    // Handling Login and Signup Forms
    const authForm = document.getElementById("form");
    if (authForm) {
        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("cPassword");
        const error_message = document.getElementById("error-message");

        authForm.addEventListener("submit", (e) => {
            let errors = [];
            if (emailInput) {
                errors = getSigupFormErrors(
                    usernameInput.value,
                    emailInput.value,
                    passwordInput.value,
                    confirmPasswordInput.value,
                    usernameInput, emailInput, passwordInput, confirmPasswordInput
                );
            } else {
                errors = getLoginFormErrors(usernameInput.value, passwordInput.value, usernameInput, passwordInput);
            }

            if (errors.length > 0) {
                e.preventDefault();
                error_message.innerHTML = errors.join("<br>");
                return;
            }
        });

        // Clear error styling on input
        [usernameInput, emailInput, passwordInput, confirmPasswordInput].filter(i => i).forEach(input => {
            input.addEventListener("input", () => {
                if (input.parentElement.classList.contains("incorrect"))
                    input.parentElement.classList.remove("incorrect");
                error_message.innerHTML = "";
            });
        });
    }

    // Handling Book Add/Edit Forms
    const bookForm = document.getElementById("bookForm");
    if (bookForm) {
        const error_message = document.getElementById("error-message");
        
        bookForm.addEventListener("submit", (e) => {
            // If the user clicked "Delete", skip validation
            if (e.submitter && e.submitter.value === 'delete') {
                return;
            }

            let errors = [];
            const title = bookForm.querySelector('input[name="title"]');
            const author = bookForm.querySelector('input[name="author"]');
            const price = bookForm.querySelector('input[name="price"]');
            const category = bookForm.querySelector('select[name="category"]');

            if (title && !title.value.trim()) errors.push("Book Title is required.");
            if (author && !author.value.trim()) errors.push("Author name is required.");
            if (category && !category.value) errors.push("Please select a category.");
            
            if (price) {
                const priceVal = parseFloat(price.value);
                if (isNaN(priceVal)) {
                    errors.push("Price must be a number.");
                } else if (priceVal <= 0) {
                    errors.push("Price must be a positive value.");
                }
            }

            if (errors.length > 0) {
                e.preventDefault();
                error_message.innerHTML = errors.join("<br>");
            }
        });
    }
});

function getLoginFormErrors(username, password, uInput, pInput) {
    let errors = [];
    if (!username || username.trim() === "") {
        errors.push("Username is required");
        uInput.parentElement.classList.add("incorrect");
    }
    if (!password || password.trim() === "") {
        errors.push("Password is required");
        pInput.parentElement.classList.add("incorrect");
    }
    return errors;
}

function getSigupFormErrors(username, email, password, confirmPassword, uInput, eInput, pInput, cpInput) {
    let errors = [];
    if (!username || username.trim() === "") {
        errors.push("Username is required");
        uInput.parentElement.classList.add("incorrect");
    }
    if (!email || email.trim() === "") {
        errors.push("Email is required");
        eInput.parentElement.classList.add("incorrect");
    }
    if (!password || password.trim() === "") {
        errors.push("Password is required");
        pInput.parentElement.classList.add("incorrect");
    } else if (password.length < 8) {
        errors.push("Password must have at least 8 characters");
        pInput.parentElement.classList.add("incorrect");
    }
    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
        pInput.parentElement.classList.add("incorrect");
        cpInput.parentElement.classList.add("incorrect");
    }
    return errors;
}
