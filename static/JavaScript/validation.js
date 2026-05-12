const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("cPassword");
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
    error_message.innerHTML = errors.join("<br>");
    return;
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
].filter(input=>input!==null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect"))
      input.parentElement.classList.remove("incorrect");
    error_message.innerHTML = "";
  });
});
