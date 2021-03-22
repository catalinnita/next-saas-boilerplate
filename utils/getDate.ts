
export const getDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toString().slice(4, 15)
}
