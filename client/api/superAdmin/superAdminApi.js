import { getToken } from "../../utils/utils";

const baseUrl = "http://localhost:8090";
const superAdminApi = {
  getAdmin: async () => {
    try {
      let req = await fetch(`b${baseUrl}/user/getAll-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      let res = await req.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  verifyAdmin: async function (adminId) {
    try {
      const response = await fetch(`${baseUrl}/user/verifyAdmin/${adminId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Admin verified successfully");
        location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error verifying admin:", error);
      alert("Something went wrong. Please try again.");
    }
  },
};

export default superAdminApi;
