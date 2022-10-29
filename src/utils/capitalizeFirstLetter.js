// function to capitalize the first letter of a string

export default function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}