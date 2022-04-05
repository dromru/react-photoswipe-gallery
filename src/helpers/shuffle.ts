function shuffle<T>(array: T[]) {
  const result = [...array]
  let currentIndex = result.length
  let temp: any
  let randomIndex: number
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temp = result[currentIndex]
    // eslint-disable-next-line no-param-reassign
    result[currentIndex] = result[randomIndex]
    // eslint-disable-next-line no-param-reassign
    result[randomIndex] = temp
  }

  return result
}

export default shuffle
