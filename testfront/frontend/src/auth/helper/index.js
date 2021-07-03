import {API} from "../../backend";


export const signin = user =>{
    console.log(user);
    return fetch(`${API}signin`,{
        method: "POST",
        headers:{
            Accept:"application/JSON",
            "Content-type":"application/JSON"
        },
        body:JSON.stringify(user)
    })
    .then( response =>{
        console.log(response);
        return response.json()
    })
    .catch(error => console.log(error));
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
