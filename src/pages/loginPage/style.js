import styled from 'styled-components';

export const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-around;
	width: 100%;

	@media screen and (min-width: 768px) {
		justify-content: center;
		margin: 0 auto;
		width: 50%;
	}

	@media screen and (min-width: 1024px) {
		width: 40%;
	}
`;

export const TitleContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-family: 'IBM Plex Sans', sans-serif;
	row-gap: 11px;
`;

export const MainTitle = styled.h1`
	color: #373737;
	font-size: 2.25rem;
	font-weight: 700;
`;

export const SubTitle = styled.h2`
	font-size: 1rem;
	font-weight: 300;
`;

export const Form = styled.form`
	align-items: center;
	display: flex;
	row-gap: 56px;
	flex-direction: column;
	padding: 0 32px;

	@media screen and (min-width: 768px) {
		row-gap: 28px;
	}
`;

export const Inputs = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 8px;
	width: 100%;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 18px;
	width: 100%;
`;

export const LoginButton = styled.input`
	background: linear-gradient(90deg, var(--gradiente1), var(--gradiente2));
	color: #fff;
	cursor: pointer;
	border: none;
	border-radius: 27px;
	height: 50px;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	transition: 0.25s all;

	&:hover {
		box-shadow: var(--gradiente1) 0px 2px 16px 0px;
		transform: translateY(-0.25em);
	}

	@media screen and (min-width: 768px) {
		font-size: 0.9rem;
	}
`;

export const Line = styled.hr`
	background: linear-gradient(90deg, var(--gradiente1), var(--gradiente2));
	border: none;
	height: 1px;
	margin: 0;
`;

export const SignUpButton = styled.button`
	background-color: #fff;
	color: var(--laranja);
	cursor: pointer;
	border: 1px solid var(--laranja);
	border-radius: 27px;
	height: 50px;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	transition: 0.25s all;

	&:hover {
		box-shadow: var(--gradiente2) 0px 2px 0px 0px;
		transform: translateY(-0.25em);
	}

	@media screen and (min-width: 768px) {
		font-size: 0.9rem;
	}
`;

export const Error = styled.span`
	color: var(--gradiente1);
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	text-align: center;
`;
