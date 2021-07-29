
/**
 * This function change the username saved in localStorage
 * @param {Object} data
 */
export default async function ChangeLocalUsername(data){

  localStorage.setItem('dawnpen-username', data.text)

  window.location.reload(false)

}
