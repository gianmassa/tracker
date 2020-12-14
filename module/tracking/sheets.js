const axios = require('axios')
require('dotenv').config()

const sheets = {
  // Create a new row in Google Sheets
  createRowInSheets: (data) => {
  axios.post(process.env.SHEETS_URI,{
        "data": data
    }, {
      withCredentials: true,
      auth: {
          username: process.env.SHEETS_LOGIN,
          password: process.env.SHEETS_PASSWORD
      }
    }).then( response => {
        console.log(response.data);
    }).catch(error => {console.log(error)});
  },

  // Update the status of an order in Google Sheets
  updateStatus: (code, codeSystem, data) => {
    axios.patch(`${process.env.SHEETS_URI}/${codeSystem}_code/${code}`, {
        "data": data
    }, {
      withCredentials: true,
      auth: {
          username: process.env.SHEETS_LOGIN,
          password: process.env.SHEETS_PASSWORD
      }
    }).then( response => {
        console.log(response.data);
    }).catch(error => {console.log(error)});
  },

}

module.exports = sheets
