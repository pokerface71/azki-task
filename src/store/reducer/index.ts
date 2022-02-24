import { combineReducers } from 'redux';
import formDataState from './formData.reducer';

const rootReducer = combineReducers({
	formData: formDataState.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
