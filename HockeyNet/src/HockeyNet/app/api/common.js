
import constants from '../constants';
var agent = require('superagent-promise')(require('superagent'), Promise);


let commonAPI = {
  uploadFiles(files, callback) {
      var req = agent.post('/upload');
      files.forEach((file)=> {
          req.attach('videoFile', file);
      });
      return req.end();
  },
  
  getTimeStamps(fileName){
    return fetch(`/getTimeStamps`, {
      method: 'post',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({fileName})
    })
    .then((response) => response.json())
  }
};

export default commonAPI;
