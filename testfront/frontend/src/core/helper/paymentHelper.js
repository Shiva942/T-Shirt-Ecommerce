import { API } from "../../backend";

export const getmeToken = (userId, token) => {
  console.log(userId, token);
  return new Promise((resolve, reject) => {
    console.log("PROMISE");
        fetch(`${API}payment/gettoken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("TOPEK RESPONSE");
        console.log(response);
        return resolve(response.json());
      })
      .catch(err => {
        console.log(err);
        reject(err.json());
      }
      )
  })
 
};

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}payment/makepayment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
