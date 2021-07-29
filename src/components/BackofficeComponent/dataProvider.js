import axios from 'axios'

/**
 * Fetches the data
 * @param {String} url
 * @param {String} access_token
 * @returns {Array}
 */
export default async function dataProvider(url, access_token = ""){

  const response = await axios.get(url, { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}`}})

  return response.data

}
