import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { authToken } from "./Startgame";

export default function Playground() {
  let { id } = useParams();
  console.log(id);
  async function getPlayground() {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/game/get/${id}`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (<>
  <button onClick={getPlayground}>here</button>
  {id}
  </>);
}
