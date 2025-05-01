export const formatDate = (targetDate) => {
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  return `${targetDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}
