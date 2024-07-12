import axios from "axios"

import { BASE_URL } from "@/constants"

const fetchData = async (target: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${target}`)
    return response.data
  } 
  catch (error) {
    console.error(`Error fetching data from ${target}`, error)
  }
}

export default fetchData