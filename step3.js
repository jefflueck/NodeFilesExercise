const fs = require('fs');
const process = require('process');
const axios = require('axios');

// ? For all of these functions we set an argument out and I'm not sure why we are doing this.
// * The text parameter is the argument we are passing in as the third argument when we run the script in the terminal.
function handleOutput(text, out) {
  if (out) {
    // writeFile is a built in script in node.js. Double check with mentor for more explanation.
    fs.writeFile(out, text, 'utf8', function (err) {
      if (err) {
        console.error(`Error writing file ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(`Error reading file ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data, out);
  } catch (err) {
    console.error(`Error reading file ${url}: ${err}`);
    process.exit(1);
  }
}

// * Solution code:
// if (path.slice(0, 4) === 'http') {
//   webCat(path);
// } else {
//   cat(path);
// }

// ? Why do we set these variables here and not at the top?
let path;
let out;

// ? Need to go over with mentor on this.
// * Alternate solution:
if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

// This logic is used to determine what function to call based on the input given in the terminal when running the script file.
if (path.startsWith('http')) {
  webCat(path, out);
} else {
  cat(path, out);
}
