exports.managersModalState = (showState, value) => {
  localStorage.removeItem("student");
  localStorage.removeItem("course");
  localStorage.removeItem("studentInfo");
  showState(value);
  return;
};

exports.managersModalEdit = (showState, value, setEdit, edit) => {
  setEdit(edit);
  showState(value);
  // console.log("editdata ", edit);
  return;
};

exports.openLink = (link) => window.open(link);
exports.dateFormater = (date) => {
  let formattedDate = new String();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let datePrefix = [1, 2, 3];
  let newDate = new Date(date);
  let currentDate = newDate.getDate();
  let formattedCurrentDate;
  let currentMonth = newDate.getMonth();
  let currentMonthValue = months[currentMonth];
  if (currentDate.toString().split("").length > 1) {
    currentDate.toString().split("")[1].includes("1")
      ? (formattedCurrentDate = currentDate.toString().concat("st"))
      : currentDate.toString().split("")[1].includes("2")
      ? (formattedCurrentDate = currentDate.toString().concat("nd"))
      : currentDate.toString().split("")[1].includes("3")
      ? (formattedCurrentDate = currentDate.toString().concat("rd"))
      : (formattedCurrentDate = currentDate.toString().concat("th"));
  } else {
    currentDate == 1
      ? (formattedCurrentDate = currentDate.toString().concat("st"))
      : currentDate == 2
      ? (formattedCurrentDate = currentDate.toString().concat("nd"))
      : currentDate == 3
      ? (formattedCurrentDate = currentDate.toString().concat("rd"))
      : (formattedCurrentDate = currentDate.toString().concat("th"));
  }
  formattedDate +=
    formattedCurrentDate +
    " " +
    currentMonthValue +
    ", " +
    new Date().getFullYear();
  return formattedDate;
};
