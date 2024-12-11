import superAdminApi from "../api/superAdmin/superAdminApi.js";
import userApi from "../api/user.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";

// Render the navbar
document.getElementById("navbar").innerHTML = navbar();
const handleReject = async (id) => {
  await userApi.delete(id);
  window.location.reload();
};
const handleApprove = async (id) => {
  userApi.verifyadmin(id);
  window.location.reload();
};

const adminlist = (data) => {
  const adminListContainer = document.getElementById("adminlist");
  adminListContainer.innerHTML = "";

  data.forEach((ele) => {
    const username = document.createElement("h2");
    username.innerHTML = ele.username;

    const email = document.createElement("p");
    email.innerHTML = `Email: ${ele.email}`;

    const number = document.createElement("p");
    number.innerHTML = `Contact: ${ele.number}`;

    const approve = document.createElement("button");
    approve.innerHTML = "Approve";
    approve.addEventListener("click", () => handleApprove(ele._id));

    const reject = document.createElement("button");
    reject.innerHTML = "Reject";
    reject.addEventListener("click", () => handleReject(ele._id));

    const div = document.createElement("div");
    div.append(username, email, number, approve, reject);
    adminListContainer.appendChild(div);
  });
};

const getAdminList = async () => {
  if (!isSuperAdmin()) {
    alert("You are not authorized to view this page.");
    window.location.href = "/";
    return;
  }

  try {
    const data = await superAdminApi.getAdmins();
    const unapprovedAdmins = data.filter((admin) => !admin.isVerified);
    adminlist(unapprovedAdmins);
  } catch (error) {
    console.error("Error fetching admin data:", error);
  }
};

// const handleApprove = async (id) => {
//   try {
//     const result = await userApi.verifyAdmin(id);
//     alert(result.message || "Admin approved successfully.");
//     getAdminList();
//   } catch (error) {
//     alert(`Error approving admin: ${error.message}`);
//     console.error(error);
//   }
// };


// const handleReject = async (id) => {
//   try {
//     await userApi.delete(id);
//     alert("Admin rejected.");
//     getAdminList();
//   } catch (error) {
//     console.error("Error rejecting admin:", error);
//   }
// };

getAdminList();
