export const readCsv = (fileContent) => {
  fileContent = fileContent.replace(/\r\n/g, "\n");
  console.log(fileContent);
  const lines = fileContent.split("\n");
  const headers = lines[0].split(",");
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = line[j];
    }
    data.push(obj);
  }
  return data;
};

// Write a regex that matches a each ignores commas within quotes but not commas outside of quotes
// const regex = /(?<=")[^"]+(?=")|[^,]+/g;
