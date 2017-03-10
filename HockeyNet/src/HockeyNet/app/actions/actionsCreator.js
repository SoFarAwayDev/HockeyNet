import constants from '../constants';
import commonApi from '../api/common';

let actionsCreator = {

  uploadFiles(files) {
    return (dispatch) => {
      commonApi.uploadFiles(files)
        .then((result) => {
            dispatch({
            type: constants.VIDEO_UPLOADED,
            filePath: result.body.filePath
          });
          dispatch(actionsCreator.getTimeStamps(result.body.fileName));
        })
    }
  },

  getTimeStamps(fileName){
      return (dispatch) => {
          commonApi.getTimeStamps(fileName)
              .then((result) => {
                  dispatch({
                      type: constants.TIME_STAMPS_RESEVED,
                      timeStamps: result.timeStamps
                  });
              })
      }
  }
};

export default actionsCreator;
