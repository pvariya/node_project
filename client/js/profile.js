import superAdminApi from "../api/superAdmin/superAdminApi.js";
import userApi from "../api/user.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";

// Render the navbar
document.getElementById("navbar").innerHTML = navbar();
const adminlist = (data) => {
  console.log(data);
  
  document.getElementById("adminlist").innerHTML = ""; 
  data.forEach((ele) => {
    const username = document.createElement("h2");
    username.innerHTML = ele.username;

    const email = document.createElement("p");
    email.innerHTML = ele.email;

    const number = document.createElement("p");
    number.innerHTML = ele.number;

    const approve = document.createElement("button");
    approve.innerHTML = "Approve";
    approve.addEventListener("click", () => handleApprove(ele._id));

    const reject = document.createElement("button");
    reject.innerHTML = "Reject";
    reject.addEventListener("click", () => handleReject(ele._id));

    const div = document.createElement("div");
    div.append(username, email, number, approve, reject);

    document.getElementById("adminlist").append(div);
  });
};

// Function to fetch and render the admin list
const getAdminList = async () => {
  if (!isSuperAdmin()) {
    alert("You are not authorized to view this page."); // Or log if for dev only
    window.location.href = "/"; // Redirect to home or another page
    return; // Stop further execution
  }

  try {
    const data = await superAdminApi.getAdmins();
    const unapprovedAdmins = data.filter((Admin) => !Admin.isVerified);
    adminlist(unapprovedAdmins);
  } catch (error) {
    console.error("Error fetching admin data:", error);
  }
};

// Fetch and display the admin list
getAdminList();

// Approve admin logic
const handleApprove = async (id) => {
  try {
    await userApi.verifyAdmin(id)
    alert("Admin approved successfully.");
    getAdminList(); // Refresh the admin list
  } catch (error) {
    console.error("Error approving admin:", error);
  }
};

// Reject admin logic
const handleReject = async (id) => {
  try {
    await userApi.delete(id)
    alert("Admin rejected.");
    getAdminList(); // Refresh the admin list
  } catch (error) {
    console.error("Error rejecting admin:", error);
  }
};
