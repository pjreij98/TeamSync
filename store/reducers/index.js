// src/store/reducers/index.js

import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
    taskState: taskReducer,
    // Add other reducers here if needed
});

export default rootReducer;
