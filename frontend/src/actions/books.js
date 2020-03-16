// Imports
const axios = require('axios')

// Load books
export const getBooks = async (userId = '53242860', page = 1) => {
  try {

    const response = await axios(
      `http://localhost:3002/user/books?userId=${userId}&page=${page}`
    )

    return response

  } catch (err) {
    console.log('ERROR', err.response)
    return err.response
  }
}
