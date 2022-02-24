import { createAction, createSlice } from '@reduxjs/toolkit';
interface IFromDataPayload {
	name: keyof IFromData;
	value: string | number | any;
}
export const updateFormData = createAction<IFromDataPayload>('updateFormData');
export const clearFromData = createAction<null>('clearFromData');
const fromDateLocal = localStorage.getItem('fromDateLocal');
let formDataLocalParse = null;
if (fromDateLocal !== null) {
	formDataLocalParse = JSON.parse(fromDateLocal);
}
const updateFormDataInLocal = (state: IFromData) => {
	localStorage.removeItem('fromDateLocal');
	localStorage.setItem('fromDateLocal', JSON.stringify(state));
};
const initialState: IFromData = {
	name: '',
	family: '',
	mobile: '',
	password: '',
	typeCar: 0,
	modelCar: 0,
	company: 0,
	discountHuman: 0,
	discountRunning: 0,
};
const formDataState = createSlice({
	name: 'formData',
	initialState: formDataLocalParse || initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(updateFormData, (state, action) => {
			state = {
				...state,
				[action.payload.name]: action.payload.value,
			};
			updateFormDataInLocal(state);
			return state;
		});
		builder.addCase(clearFromData, () => {
			updateFormDataInLocal(initialState);
			return initialState;
		});
	},
});

export default formDataState;
