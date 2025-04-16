
const baseURL = "https://api.spacexdata.com/v3"

export const getLaunches = async (index) => {

  const params = index  ? `?offset=${index}0&limit=10` : `?offset=0&limit=10`

  const response = await fetch(`${baseURL}/launches${params}`)
  
  return await response.json();
}