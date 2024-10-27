const makeid = (size) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < (size || 8); i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

module.exports = { makeid };
