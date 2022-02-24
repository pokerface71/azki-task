import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DropDownHookFormControl } from '..';
import { updateFormData } from 'src/store/reducer/formData.reducer';
import { Link, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { useRequest } from 'ahooks';
import { getInsureCompanies } from 'src/Services/form/form.service';

const StepThree: FC<IStepProps> = ({ formDataState }) => {
	const [companyList, setCompanyList] = useState<any[]>();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit: handleSubmitUser,
		watch: watchUser,
	} = useForm();
	const { loading: insureCompaniesLoading } = useRequest(getInsureCompanies, {
		manual: false,
		onSuccess: (data: any) => {
			const carTypes: any[] = [];
			data.object.data.forEach((item: any) => {
				carTypes.push({
					label: ``,
					value: item.id,
				});
			});
			setCompanyList(carTypes);
		},
	});
	const SubmitUserData = () => {
		new Promise((resolve: any) => {
			resolve(
				dispatch(updateFormData({ name: 'company', value: watchUser('') }))
			);
		}).then(() => {
			console.log('1');
			navigate('/four');
		});
	};
	if (formDataState.mobile === '') {
		navigate('/');
	}
	return (
		<>
			{' '}
			<h3 className="font-24 mb-5">بیمه شخص ثالث</h3>
			<p className="font-12 is-gray">شرکت بیمه گر قبلی خود را انتخاب کنید</p>
			<form className="row mt-5" onSubmit={handleSubmitUser(SubmitUserData)}>
				<div className="col-12">
					<DropDownHookFormControl
						control={control}
						rules={{
							required: true,
						}}
						classList={insureCompaniesLoading ? 'isLoading ' : ''}
						name="company"
						placeholder="شرکت بیمه گر قبلی"
						option={companyList || [{ id: 1, value: '---' }]}
						defaultValue={`${formDataState.company}`}
					/>
				</div>

				<div className="col-12 mt-3">
					<div className="d-flex justify-content-between">
						<Link to="/two" className="btn btn-border btn-azki-outline-primary">
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

export default StepThree;
