export const generateId = () => {
  var current_date = (new Date()).getTime().valueOf().toString();
  var random = Math.random().toString().replace("0.","");
  return `${current_date}${random}`;
}
