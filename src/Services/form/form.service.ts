import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../axiosInstance';
import {
	CAR_TYPES,
	DRIVER_DISCOUNT,
	INSURE_COMPANIES,
	THIRD_DISCOUNT,
} from '../urls';

export const getCarTypes = () => {
	const reqConfig: AxiosRequestConfig = {
		method: 'GET',
		url: CAR_TYPES,
	};
	return axiosInstance(reqConfig).then((res) => res.data);
};
//===============company list
export const getInsureCompanies = () => {
	const reqConfig: AxiosRequestConfig = {
		method: 'GET',
		url: INSURE_COMPANIES,
	};
	return axiosInstance(reqConfig).then((res) => res.data);
};
//===============discount third list
export const getThirdDiscount = () => {
	const reqConfig: AxiosRequestConfig = {
		method: 'GET',
		url: THIRD_DISCOUNT,
	};
	return axiosInstance(reqConfig).then((res) => res.data);
};
//===============discount driver list
export const getDriverDiscount = () => {
	const reqConfig: AxiosRequestConfig = {
		method: 'GET',
		url: DRIVER_DISCOUNT,
	};
	return axiosInstance(reqConfig).then((res) => res.data);
};
