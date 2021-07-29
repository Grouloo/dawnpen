/**
 * This function formats the links in a text
 * @param {String} text
 * @returns {Array} parts
 */
export default function renderText(text){

  let url_regex = re

  let parts = text.split(url_regex)

  parts.map((part, index) =>
    index % 2 === 0 ? <a>{part}</a> : <a href={part} target="_blank" rel="noreferrer">{part} </a>
  )

  return parts

}
