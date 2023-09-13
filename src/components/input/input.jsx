import { useState } from 'react';
import { InputContainer, InputField, Label } from './style';

export default function Input(props) {

	const { placeHolder, type, value, setValue } = props;

	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<InputContainer>
			<InputField
				type={type}
				value={value}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
				required
			/>
			<Label shrink={isFocused || value}>{placeHolder}</Label>
		</InputContainer>
	);
}
