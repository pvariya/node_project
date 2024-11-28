// signupForm.js
import userApi from "../api/user.api.js";
import navbar from "../components/navbar.js";
import value from "../components/value.js";

document.getElementById("navbar").innerHTML = navbar();

const signUpData = (e) => {
  e.preventDefault();
  const user = {
    username: value("#username"),
    email: value("#email"),
    password: value("#password"),
    number: value("#phone"),
  };

  if (!user.email || !user.password || !user.username || !user.number) {
    alert("Please fill all required fields");
    return;
  }

  userApi.signUp(user);
};

document.getElementById("signupForm").addEventListener("submit", signUpData);
