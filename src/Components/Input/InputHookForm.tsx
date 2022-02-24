import { Control, useController } from 'react-hook-form';

interface IInput {
	control: Control;
	placeholder?: string;
	inputClass?: string;
	classList?: string;
	name: string;
	type?: string;
	pattern?: string;
	iconClass?: string;
	label?: string;
	labelClass?: string;
	defaultValue?: string | number;
	isReadOnly?: boolean;
	isRequiredIcon?: boolean;
	rules?: any;
}

const InputHookForm = ({
	control,
	placeholder,
	inputClass,
	classList,
	name,
	type = 'text',
	pattern,
	iconClass,
	label,
	labelClass,
	defaultValue,
	isReadOnly,
	rules,
}: IInput): JSX.Element => {
	const {
		field: { ...inputProps },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules,
		defaultValue: defaultValue || '',
	});
	return (
		<div className={`form-group ${classList}`}>
			{type !== 'checkbox' && type !== 'radio' && label && (
				<label
					htmlFor={name}
					className={`d-block font-12 text-right ${labelClass || ''}`}
				>
					{label}
				</label>
			)}
			<div
				className={`${
					(type === 'checkbox' || type === 'radio') && label
						? 'justify-content-start'
						: 'justify-content-between'
				} d-flex align-items-center position-relative`}
			>
				<input
					{...inputProps}
					className={`form-control ${inputClass || ''} ${
						(type === 'checkbox' || type === 'radio') && 'w-auto'
					} ${error ? 'has-error' : ''}`}
					id={name}
					name={name}
					placeholder={placeholder}
					pattern={pattern}
					readOnly={isReadOnly}
				/>
				{iconClass && <i className={iconClass} />}
			</div>
			{error && (
				<>
					{error && error.type === 'required' && (
						<p className={`is-error ${label ? 'has-label' : ''}`}>
							فیلد احباری
						</p>
					)}
					{error && error.type === 'pattern' && (
						<>
							{name === 'password' ? (
								<p className={`is-error ${label ? 'has-label' : ''}`}>
									لطفا از حروف کوچک و بزرگ ، اعداد انگلیسی , سیمبل ها استفاده
									کنید.
								</p>
							) : name === 'mobile' || name === 'telephone' ? (
								<p className={`is-error ${label ? 'has-label' : ''}`}>
									لطفا مطابق با الگو و از صفحه کلید انگلیسی استفاده کنید.
								</p>
							) : name === 'name' || name === 'family' ? (
								<p className={`is-error ${label ? 'has-label' : ''}`}>
									از حروف فارسی استفاده کنید
								</p>
							) : (
								<p className={`is-error ${label ? 'has-label' : ''}`}>
									مقدار را به درستی وارد کنید و از صفحه کلید انگلیسی استفاده
									کنید
								</p>
							)}
						</>
					)}
					{error && error.type === 'maxLength' && (
						<p className={`is-error ${label ? 'has-label' : ''}`}>
							{error.message ||
								'تعداد کاراکتر های وارد شده بیشتر از حد مجاز است'}
						</p>
					)}
					{error && error.type === 'minLength' && (
						<p className={`is-error ${label ? 'has-label' : ''}`}>
							{error.message ||
								'تعداد کاراکتر های وارد شده کمتر از حد مجاز است'}
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default InputHookForm;
