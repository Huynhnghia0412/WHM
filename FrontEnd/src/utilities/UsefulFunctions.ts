const findItemById = (list: any[], id: number) => {
  return list.find((item) => item.id === id);
};

const formatVNPrice = (price: number): string => {
  return price.toLocaleString("vi-VN");
};

const formatDate = (date: Date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString();
};

const formatDateToShow = (date: Date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const UsefulFunctions = {
  findItemById,
  formatVNPrice,
  formatDateToShow,
  formatDate,
};
export default UsefulFunctions;
