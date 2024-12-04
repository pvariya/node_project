let { token } = Cookies.get();

export const getToken = () => token;

const getUserData = () => {
  const decodeToken = token ? jwt_decode(token) : undefined;
  return decodeToken;
};

export const removecookies = (key) => {
  Cookies.remove(key);
};

export const isAdmin = () => {
  let decodedToken = getUserData();
  return decodedToken.role == "ADMIN";
};

export const isSuperAdmin = () => {
  let decodedToken = getUserData();
  return decodedToken?.role == "SUPER_ADMIN";
};
export const isActiveAccount = () => {
  let decodedToken = getUserData();
  return decodedToken.isActive;
};  

export default getUserData;
