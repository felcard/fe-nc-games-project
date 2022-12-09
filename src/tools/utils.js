export const formatDate = (date) => {
  let newDate = new Date(date);
  return newDate.toUTCString();
};
