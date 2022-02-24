import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DropDownHookFormControl } from '..';
import { updateFormData } from 'src/store/reducer/formData.reducer';
import { Link, useNavigate } from 'react-router-dom';
import {
	FC, //useEffect
	useState,
} from 'react';
import { useRequest } from 'ahooks';
import { getCarTypes } from 'src/Services/form/form.service';

const StepTwo: FC<IStepProps> = ({ formDataState }) => {
	const [carTypeList, setCarTypeList] = useState<any[]>();
	const [
		carModelList, // setCarModelList
	] = useState<any[]>();
	// for change car model changes by car types
	// useEffect(() => {
	// 	setCarModelList(carModelList);
	// }, [carTypeList]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit: handleSubmitUser,
		watch: watchUser,
	} = useForm();
	const { loading: carTypeLoading } = useRequest(getCarTypes, {
		manual: false,
		onSuccess: (data: any) => {
			const carTypes: any[] = [];
			data.object.data.forEach((item: any) => {
				carTypes.push({
					label: ``,
					value: item.id,
				});
			});
			setCarTypeList(carTypes);
		},
	});
	const SubmitUserData = () => {
		dispatch(updateFormData({ name: 'typeCar', value: watchUser('carType') }));
		dispatch(
			updateFormData({ name: 'modelCar', value: watchUser('modelCar') })
		);
		navigate('/three');
	};
	if (formDataState.mobile === '') {
		navigate('/');
	}
	return (
		<>
			{' '}
			<h3 className="font-24 mb-5">بیمه شخص ثالث</h3>
			<p className="font-12 is-gray">نوع و مدل خودروی خود را اتخاب کنید</p>
			<form className="row mt-5" onSubmit={handleSubmitUser(SubmitUserData)}>
				<div className="col-12 col-md-6 ">
					<DropDownHookFormControl
						control={control}
						rules={{
							required: true,
						}}
						classList={carTypeLoading ? 'isLoading mb-5' : 'mb-5'}
						name="carType"
						placeholder="نوع خودرو"
						option={carTypeList || [{ id: 1, value: '---' }]}
						defaultValue={`${formDataState.typeCar}`}
					/>
				</div>
				<div className="col-12 col-md-6">
					<DropDownHookFormControl
						control={control}
						rules={{
							required: true,
						}}
						classList={carTypeLoading ? 'isLoading mb-5' : 'mb-5'}
						name="modelCar"
						placeholder="مدل خودرو"
						option={carModelList || [{ id: 1, value: '---' }]}
						defaultValue={`${formDataState.modelCar}`}
					/>
				</div>
				<div className="col-12 mt-3">
					<div className="d-flex justify-content-between">
						<Link to="/" className="btn btn-border btn-azki-outline-primary">
							<span className="btn-icon-parent">
								<img src="/images/arrow.svg" alt="" className="rotate" />
								<span className="">بازگشت</span>
							</span>
						</Link>
						<button
							className="btn btn-border btn-azki-outline-primary"
							type="submit"
						>
							<span className="btn-icon-parent">
								<span className="">مرحله بعدی</span>
								<img src="/images/arrow.svg" alt="" />
							</span>
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default StepTwo;
