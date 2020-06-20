// This file contains method to access api that can be used inside react native project

const addNewRow = () => {
  const apiUrl = "http://10.0.3.2:3000"; // this address is accessible inside genymotion virtual device
  const endPoint = `${apiUrl}/addrow`;
  
  try {
    // you can also use other third party libararies like axios for calling api
    fetch(endPoint, {
      method: "post",
      body: JSON.stringify(newRow),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response received");
        console.log(res);
      });
  } catch (err) {
    console.error(err);
  }
};
