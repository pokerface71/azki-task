import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DropDownHookFormControl } from '..';
import { updateFormData } from 'src/store/reducer/formData.reducer';
import { FC, useState } from 'react';
import { useRequest } from 'ahooks';
import {
	getDriverDiscount,
	getThirdDiscount,
} from 'src/Services/form/form.service';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StepFour: FC<IStepProps> = ({ formDataState }) => {
	const [carThirdDiscountList, setCarThirdDiscountList] = useState<any[]>();
	const [carDriveriscountList, setCarDriverDiscountList] = useState<any[]>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit: handleSubmitUser,
		watch: watchUser,
	} = useForm();
	const { loading: carDiscountLoading } = useRequest(getThirdDiscount, {
		manual: false,
		onSuccess: (data: any) => {
			const carTypes: any[] = [];
			data.object.data.forEach((item: any) => {
				carTypes.push({
					label: ``,
					value: item.id,
				});
			});
			setCarThirdDiscountList(carTypes);
		},
	});
	const { loading: carDiscountDriverLoading } = useRequest(getDriverDiscount, {
		manual: false,
		onSuccess: (data: any) => {
			const carTypes: any[] = [];
			data.object.data.forEach((item: any) => {
				carTypes.push({
					label: ``,
					value: item.id,
				});
			});
			setCarDriverDiscountList(carTypes);
		},
	});
	const SubmitUserData = () => {
		dispatch(
			updateFormData({
				name: 'discountHuman',
				value: watchUser('discountHuman') ? watchUser('discountHuman') : '',
			})
		);
		dispatch(
			updateFormData({
				name: 'discountRunning',
				value: watchUser('discountRun') ? watchUser('discountRun') : '',
			})
		);

		setShowModal(true);
	};
	if (formDataState.mobile === '') {
		navigate('/');
	}
	return (
		<>
			{' '}
			<h3 className="font-24 mb-5">بیمه شخص ثالث</h3>
			<p className="font-12 is-gray">
				درصد تخفیف بیمه شخص ثالث و حوادث رانندگی را وارد کنید
			</p>
			<form className="row mt-5" onSubmit={handleSubmitUser(SubmitUserData)}>
				<div className="col-12">
					<DropDownHookFormControl
						control={control}
						rules={{
							required: true,
						}}
						classList={carDiscountLoading ? 'isLoading' : ''}
						name="discountHuman"
						placeholder="درصد تخفیف شخص ثالث"
						option={carThirdDiscountList || [{ id: 1, value: '---' }]}
						defaultValue={`${formDataState.discountHuman}`}
					/>
				</div>
				<div className="col-12 mt-3">
					<DropDownHookFormControl
						control={control}
						rules={{
							required: true,
						}}
						classList={carDiscountDriverLoading ? 'isLoading ' : ''}
						name="discountRun"
						placeholder="درصد تخفیف حوادث راننده"
						option={carDriveriscountList || [{ id: 1, value: '---' }]}
						defaultValue={`${formDataState.discountRunning}`}
					/>
				</div>

				<div className="col-12 mt-3">
					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-border btn-azki-primary">
							استعلام قیمت{' '}
						</button>
					</div>
				</div>
			</form>
			<Modal
				size="lg"
				show={showModal}
				onHide={() => setShowModal(false)}
				animation
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						نتیجه استعلام قیمت
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="mb-4 px-2">
						<div className="d-flex justify-content-center flex-column ">
							<p className="mb-3">
								<span className="ml-2">نام :</span>
								<span>{formDataState.name}</span>
							</p>
							<p className="mb-3">
								<span className="ml-2">نام خانوادگی : </span>
								<span>{formDataState.family}</span>
							</p>
							<p className="mb-3">
								<span className="ml-2">نوع خودرو : </span>
								<span>{formDataState.typeCar}</span>
							</p>
							<p className="mb-3">
								<span className="ml-2">مدل خودرو : </span>
								<span>{formDataState.modelCar}</span>
							</p>
							<p className="mb-3">
								<span className="ml-2">شرکت بیمه گر</span>
								<span>{formDataState.company}</span>
							</p>
							<p className="mb-3">
								<span className="ml-2">درصد تخفیف بیمه ثالث : </span>
								<span>{formDataState.discountHuman}</span>
							</p>
							<p className="mb-3">
								<span className="ml-2">درصد تخفیف بیمه حوادث رانندگی</span>
								<span>{formDataState.discountRunning}</span>
							</p>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default StepFour;
