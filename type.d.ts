// global types
interface IFromData {
	name?: string;
	family?: string;
	mobile?: string;
	password?: string;
	typeCar?: number;
	modelCar?: number;
	company?: number;
	discountHuman?: number;
	discountRunning?: number;
}
interface IStepProps {
	formDataState: IFromData;
}
interface IUsageCarType {
	id: number;
	title: string;
}
interface IModelCarType extends IUsageCarType {
	priority: number;
}
interface IBrandCarType {
	id: number;
	title: string;
	latinTitle: string;
	priority: number;
	icon: string;
	models: IModelCarType[];
}
interface ICarTypeResponse {
	id: number;
	title: string;
	categoryTitle: string;
	usages: IUsageCarType[];
	brands: IBrandCarType[];
}
