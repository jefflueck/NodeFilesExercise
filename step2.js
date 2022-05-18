const fs = require('fs');
const process = require('process');
const axios = require('axios');

// ? How does node know if it needs to run a http call or a file read?
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error reading file ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[2];

// * Solution code:
// if (path.slice(0, 4) === 'http') {
//   webCat(path);
// } else {
//   cat(path);
// }

// * Alternate solution:
if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
}
