import userApi from "../../api/user.api.js";
import navbar from "../../components/navbar.js";
import value from "../../components/value.js";

document.getElementById("navbar").innerHTML = navbar();

const adminData = (e) => {
  e.preventDefault();

  let admin = {
    username: value("#username"),
    email: value("#email"),
    password: value("#password"),
    Number: value("#number"),   
    role: "ADMIN",
    isActive: false,
  };
  if (!admin.username || !admin.email || !admin.password || !admin.Number) {
    alert("Please fill all required fields");
    return;
  }
  userApi.signUp(admin)
};

document.getElementById("adminForm").addEventListener("submit", adminData);