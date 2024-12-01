import superAdminApi from "../api/superAdmin/superAdminApi.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/utils.js";

document.getElementById("navbar").innerHTML = navbar();

const adminlist = (data) => {
  data.map((ele) => {
    const username = document.createElement("h2");
    username.textContent = ele.username;

    const email = document.createElement("p");
    email.textContent = ele.email;

    const number = document.createElement("p");
    number.textContent = ele.number;

    const approve = document.createElement("button");
    approve.textContent = "Approve";
    approve.addEventListener("click", async () => {
      await superAdminApi.verifyAdmin(ele._id); // Ensure verifyAdmin is implemented properly
      alert("Admin verified successfully");
      location.reload();
    });

    const reject = document.createElement("button");
    reject.textContent = "Reject";

    const div = document.createElement("div");
    div.append(username, email, number, approve, reject);

    document.getElementById("adminaData").append(div);
  });
};

if (isSuperAdmin()) {
  superAdminApi.getAdmin().then((data) => {
    const unapprovedAdmin = data.filter((admin) => admin.isVerified === false);
    adminlist(unapprovedAdmin);
  });
} else {
  alert("You are not authorized to access this page");
  window.location.href = "/";
}
