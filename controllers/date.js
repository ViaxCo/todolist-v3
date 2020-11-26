const today = new Date();
exports.getDate = () => {
  //Add a new method to the exports property of the module object called "getDate" and attach the function to it
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("en-US", options); //"en-US" can be replaced for undefined
};
exports.getDay = () => {
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options); //"en-US" can be replaced for undefined
};
