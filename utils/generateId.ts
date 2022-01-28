export const generateId = (): string => {
  const currentDate = new Date().getTime().valueOf().toString()
  const random = Math.random().toString().replace("0.", "")
  return `${currentDate}${random}`
}
