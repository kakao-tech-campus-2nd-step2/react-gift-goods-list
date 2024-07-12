import axios from "axios"

const BASE_URL = 'https://react-gift-mock-api-hyunaeri.vercel.app/'

const fetchData = async (target: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${target}`)
    return response.data
  } 
  catch (error) {
    console.error(`Error fetching data from ${target}`, error)
    throw error
  }
}

export default fetchData