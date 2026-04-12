const form = document.getElementById("form");
const usernameInput = document.getElementById("UserName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("Password");
const confirmPasswordInput = document.getElementById("ConfirmPassword");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];
  if (emailInput) {
    errors = getSigupFormErrors(
      usernameInput.value,
      emailInput.value,
      passwordInput.value,
      confirmPasswordInput.value,
    );
  } else {
    errors = getLoginFormErrors(usernameInput.value, passwordInput.value);
  }
  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerHTML = errors.join(", ");
  }

  e.preventDefault(); // Prevent default form submission

  let currentUser = {};

  if (emailInput) {
    // signup form
    const isAdmin = document.getElementById("Admin").checked;
    currentUser = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      type: isAdmin ? "Admin" : "User",
      loggedIn: true,
    };
  } else {
    // login form
    currentUser = {
      username: usernameInput.value.trim(),
      type: "User",
      loggedIn: true,
    };
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  if (currentUser.type === "Admin") {
    window.location.href = "admin_dashboard.html";
  } else {
    window.location.href = "User_Dashboard.html";
  }
});

function getLoginFormErrors(username, password) {
  let errors = [];
  if (username === "" || username == null) {
    errors.push("username is required");
    usernameInput.parentElement.classList.add("incorrect");
  }

  if (password === "" || password == null) {
    errors.push("password is required");
    passwordInput.parentElement.classList.add("incorrect");
  }
  return errors;
}

function getSigupFormErrors(username, email, password, confirmPassword) {
  let errors = [];
  if (username === "" || username == null) {
    errors.push("username is required");
    usernameInput.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("email is required");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("password is required");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if (confirmPassword === "" || confirmPassword == null) {
    errors.push("Confirm Password is required");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at Least 8 characters");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if (password !== confirmPassword) {
    errors.push("Password does not match Confirm Password");
    passwordInput.parentElement.classList.add("incorrect");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }
  return errors;
}

const allInputs = [
  usernameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
];
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect"))
      input.parentElement.classList.remove("incorrect");
    error_message.innerHTML = "";
  });
});
