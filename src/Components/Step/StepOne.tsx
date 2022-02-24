import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { InputHookForm } from '..';
import { updateFormData } from 'src/store/reducer/formData.reducer';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const StepOne: FC<IStepProps> = ({ formDataState }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		control,
		handleSubmit: handleSubmitUser,
		watch: watchUser,
	} = useForm();
	const SubmitUserData = () => {
		dispatch(
			updateFormData({
				name: 'name',
				value: watchUser('name') ? watchUser('name') : '',
			})
		);
		dispatch(
			updateFormData({
				name: 'family',
				value: watchUser('family') ? watchUser('family') : '',
			})
		);
		dispatch(
			updateFormData({
				name: 'mobile',
				value: watchUser('mobile') ? watchUser('mobile') : '',
			})
		);
		dispatch(
			updateFormData({
				name: 'password',
				value: watchUser('password') ? watchUser('password') : '',
			})
		);
		navigate('/two');
	};

	return (
		<form className="row " onSubmit={handleSubmitUser(SubmitUserData)}>
			<h3 className="font-24 mb-3">ثبت نام</h3>
			<div className="col-12 col-md-6">
				<InputHookForm
					control={control}
					name="name"
					rules={{
						required: true,
						pattern: /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/,
						message: 'از حروف فارسی استفاده کنید',
						maxLength: {
							value: 50,
							message: 'حداکثر تغداد کاراکترخای مجاز ۵۰ عدد است.',
						},
					}}
					defaultValue={formDataState.name}
					placeholder="نام"
				/>
			</div>
			<div className="col-12 col-md-6">
				<InputHookForm
					control={control}
					name="family"
					rules={{
						required: true,
						pattern: /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/,
						maxLength: {
							value: 50,
							message: 'حداکثر تغداد کاراکترخای مجاز ۵۰ عدد است.',
						},
					}}
					placeholder="نام خانوادگی"
					defaultValue={formDataState.family}
				/>
			</div>
			<div className="col-12 mt-3">
				<InputHookForm
					control={control}
					name="mobile"
					rules={{
						required: true,
						pattern: /^09\d{9}$/,
					}}
					placeholder="شماره موبایل"
					defaultValue={formDataState.mobile}
				/>
			</div>
			<div className="col-12 mt-3">
				<InputHookForm
					control={control}
					name="password"
					rules={{
						required: true,
						pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
					}}
					placeholder="رمز عبور"
					defaultValue={formDataState.password}
				/>
			</div>
			<div className="col-12 mt-3">
				<div className="d-flex justify-content-end">
					<button type="submit" className="btn btn-border btn-azki-primary">
						ثبت نام
					</button>
				</div>
			</div>
		</form>
	);
};

export default StepOne;
