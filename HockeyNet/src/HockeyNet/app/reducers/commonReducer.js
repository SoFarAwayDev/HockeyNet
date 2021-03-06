import constants from '../constants';
import update from 'react-addons-update';

let initialState = {
  filePath: '',
  timeStamps: [],
  timeSeek: 0
};
const initialAction = { type: 'initial state'}

const common = (state = initialState, action = initialAction) => {
  
    switch (action.type) {
        case constants.VIDEO_UPLOADED:
            return update(state, {
                filePath: { $set: action.filePath },
                isLoading: {$set: false}
            });
        case constants.TIME_STAMPS_RESEVED:
            return update(state, {
                timeStamps: { $set: action.timeStamps }
            });
        case constants.SEEK_VIDEO:
            return update(state, {
                timeSeek: { $set: action.time }
            });
        case constants.UPLOADING_STARTED:
            return update(state, {
                isLoading: { $set: true }
            });

        default:
          return state;
    }
}

export default common;
