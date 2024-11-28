import userApi from "../api/user.api.js";
import navbar from "../components/navbar.js";
import value from "../components/value.js";
import { isSuperAdmin } from "../utils/utils.js";
document.getElementById("navbar").innerHTML = navbar();

if (isSuperAdmin()) {
} else {
    window.location.href = "/";
    alert("You are not authorized to access this page");
}
