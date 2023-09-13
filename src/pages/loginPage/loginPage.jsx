import Logo from '../../assets/logo_grande.svg';
import {
	Buttons,
	Error,
	Form,
	Inputs,
	Line,
	LoginButton,
	MainContainer,
	MainTitle,
	SignUpButton,
	SubTitle,
	TitleContainer,
} from './style';
import Input from '../../components/input/input';
import { useNavigate } from 'react-router-dom';
import { goToSignUpPage, goToPostsPage } from '../../routes/coordinator';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../constants/url';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [erro, setErro] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = {
				email: email,
				password: password,
			};

			const response = await axios.post(BASE_URL + '/users/login', body);
			window.localStorage.setItem(TOKEN, response.data);

			goToPostsPage(navigate);
		} catch (error) {
			setErro(error.response.data);
		}
	};

	const handleSignUpClick = () => {
		goToSignUpPage(navigate);
	};

	return (
		<>
			<MainContainer>
				<TitleContainer>
					<img width={'84px'} src={Logo} alt="" />
					<MainTitle>LabEddit</MainTitle>
					<SubTitle>O projeto de rede social da Labenu</SubTitle>
				</TitleContainer>
				<Form onSubmit={handleSubmit}>
					<Error>{erro}</Error>
					<Inputs>
						<Input
							placeHolder="E-mail"
							type="email"
							value={email}
							setValue={setEmail}
						/>
						<Input
							placeHolder="Senha"
							type="password"
							value={password}
							setValue={setPassword}
						/>
					</Inputs>
					<Buttons>
						<LoginButton type="submit" value="Continuar" />
						<Line />
						<SignUpButton onClick={handleSignUpClick}>
							Crie uma conta!
						</SignUpButton>
					</Buttons>
				</Form>
			</MainContainer>
		</>
	);
}
