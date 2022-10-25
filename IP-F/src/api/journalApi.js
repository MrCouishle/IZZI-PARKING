import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://izzi-parking-default-rtdb.firebaseio.com/",
});
export default journalApi;
