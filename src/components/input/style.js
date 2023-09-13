import styled from 'styled-components';

export const InputContainer = styled.div`
	position: relative;
`;

export const InputField = styled.input`
	border: 1px solid #d5d8de;
	border-radius: 4px;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1rem;
	font-weight: 400;
	height: 60px;
	transition: all 0.3s ease;
    padding: 0 15px;
	width: calc(100% - 30px);

	&:focus {
		outline: none;
		border-color: var(--laranja);
	}

	&:focus ~ label {
		top: 5px;
		font-size: 10px;
	}

	@media screen and (min-width: 768px){
		font-size: 0.8rem;
		height: 50px;  
	}
`;

export const Label = styled.label`
	color: #323941;
	font-size: 1rem;
	left: 20px;
	top: 20px;
	transition: all 0.3s ease;
	position: absolute;
	pointer-events: none;

	${(props) =>
		props.shrink &&
		`
    top: 5px;
    font-size: 10px;
  `}
`;
