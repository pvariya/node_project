import userApi from '../api/user.api.js'
import navbar from'../components/navbar.js'
import value from '../components/value.js'
document.getElementById('navbar').innerHTML=navbar()

const logindata = (e)=>{
    e.preventDefault()
    let user  ={
        email :value("#email"),
        password : value("#password")
    }

    if(!user.email || !user.password){
        alert("Please fill all fields")
        return
    }
    userApi.login(user)
}

document.getElementById('loginForm').addEventListener('submit', logindata)