// function to capitalize the first letter of a string

type capitalizeFirstLetter = (str: string | undefined) => string

export const capitalizeFirstLetter: capitalizeFirstLetter = (str) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    return ''
  }
}

export default capitalizeFirstLetter
