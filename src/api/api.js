import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const url = "http://localhost:3000/api"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5MjQ3NDQ1LCJleHAiOjE2ODkyNTEwNDV9.G__hOouallXDM-nER7CC2cbVIKTHEa96EgbIUDHO5m8";

// console.log(url, token);

export const getAllAvailableGames = async () => {
  try {
    const response = await axios.get(`${url}/game/get-all?status=waiting`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
