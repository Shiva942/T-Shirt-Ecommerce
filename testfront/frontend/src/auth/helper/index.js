import {API} from "../../backend";


export const signin = user =>
{
    console.log("SIGN-IN USER");
    console.log(user);
    const users = JSON.stringify(user);
    return new Promise((resolve,reject)=>
    {

        fetch(`${API}/signin`,{
            method: "POST",
            headers:{
                Accept:"application/JSON",
                "Content-type":"application/JSON"
            },
            body:users
        })
        .then( response =>{
            console.log("Sign in resp");
            console.log(response);
            resolve(response.json());
        })
        .catch(error => reject(error.json()));

    }
    );  
}

export const signup = user =>{
    return fetch(`${API}/signup`,{
        method: "POST",
        headers:{
            Accept:"application/JSON",
            "Content-type":"application/JSON"
        },
        body:JSON.stringify(user)
    })
    .then( response =>{

        return response.json()
    })
    .catch(error => console.log(error));
}

export const authenticate =(data,next)=>{
    if(typeof window !== 'undefined')
        {
            console.log("AUTH");
            localStorage.setItem("jwt", JSON.stringify(data));
            next();
    }
}
export const signout =(next)=>{
    if(typeof window !== 'undefined')
        {
            localStorage.removeItem("jwt")
            next();
            return fetch(`${API}/signout`,{
                method: "GET",
            })
            .then( response =>{
                console.log("SIGNOUT SUCCESS");
            })
            .catch(error => console.log(error));
    }
}

export const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
