
export const URL = 'http://localhost:3000'
export const getDataEcoPlants = async (page, limit) => {

    const response = await fetch(`${URL}/api/data?page=${page}&limit=${limit}`)
    const responseJson = await response.json()
    return responseJson

}