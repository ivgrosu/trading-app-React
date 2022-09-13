import axios from "axios";

const TOKEN = "cccpsmiad3i4bak9ea70";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
