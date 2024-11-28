const { token } = Cookies.get();

const decodedToken = token ? jwt_decode(token) : undefined;
const logOut = () => {
  Cookies.remove("token");
  window.location.href = "/pages/login.html";
};
const navbar = (navbar) => {
  let logUotTag = ``;
  if (decodedToken) {
    logUotTag = `<a class="nav-link active" aria-current="page" id=logout> Logout </a>`;
  } else {
    logUotTag = `<a class="nav-link active" aria-current="page" href="/pages/login.html">
      logIn
    </a>`;
  }

  return `<nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/index.html">home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/pages/product.html">product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/pages/cart.html">cart</a>
            </li>
             <li class="nav-item">
              ${logUotTag}
            </li>
             <li class="nav-item">
              <a class="nav-link" ${
                decodedToken ? "" : ` href=/pages/signup.html`
              }>${decodedToken ? decodedToken.username : "Signup"}</a>
            </li>
             <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/pages/profile.html">profile</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
};

export default navbar;

document.addEventListener("DOMContentLoaded",()=>{
  let logUotbtn  = document.getElementById("logout");
  if (logUotbtn) {
    logUotbtn.addEventListener("click", logOut);
  }
})  
