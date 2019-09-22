export const urlEncode = data => {
  const str = [];
  for (const p in data) {
      if (data.hasOwnProperty(p) && (!(data[p] == undefined || data[p] == null))) {
          str.push(encodeURIComponent(p) + "=" + (data[p] ? encodeURIComponent(data[p]) : ""));
      }
  }
  return str.join("&");
}
