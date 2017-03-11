
import constants from '../constants';
import helpers from '../helpers'
var agent = require('superagent-promise')(require('superagent'), Promise);


let commonAPI = {
    uploadFiles(files, dispatch) {
          var fileName = helpers.makeid(9)
          var req = agent.post(`${constants.API}/upload`);
          req.attach(fileName, files[0]);
          return req.on('progress', function (e) {
              dispatch({
                  type: constants.VIDEO_UPLOADING_IN_PROGRESS,
                  filePath: `/video/${fileName}.mp4`
              })
          }).end();
  },
  
  getTimeStamps(fileName){
      return fetch(`${constants.API}/getTimeStamps`, {
      method: 'post',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({fileName})
    })
    .then((response) => response.json())
  }
};

export default commonAPI;
