import { Control, useController } from 'react-hook-form';

interface IDropDownHookFormControlProps {
	control: Control;
	rules?: Record<string, any>;
	option: Record<string, string>[];
	name: string;
	defaultValue?: string;
	selectClass?: string;
	classList?: string;
	label?: string;
	labelClass?: string;
	placeholder?: string;
}
const DropDownHookFormControl = ({
	control,
	rules,
	name,
	classList,
	selectClass,
	option,
	label,
	labelClass,
	placeholder,
	defaultValue,
}: IDropDownHookFormControlProps): JSX.Element => {
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
		<div className={`input-form-hook ${classList}`}>
			{label && (
				<label
					htmlFor={name}
					className={`d-block text-right  ${labelClass || ''}`}
				>
					{label}
				</label>
			)}
			<select
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...inputProps}
				id={name}
				name={name}
				className={`input-form-hook--input ${selectClass || ''} ${
					error ? 'input-error' : ''
				}`}
				placeholder={placeholder}
			>
				<option value="" className="text-gray">
					{placeholder}
				</option>

				{option?.map((item, index) => {
					return (
						<option value={item.value || item.id} key={index}>
							{item.name}
						</option>
					);
				})}
			</select>

			{error && (
				<>
					{error && error.type === 'required' && (
						<p className="input-form-hook--error">فیلد اجباری</p>
					)}
				</>
			)}
		</div>
	);
};

export default DropDownHookFormControl;
