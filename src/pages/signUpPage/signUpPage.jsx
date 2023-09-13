import {
	Header,
	Logo,
	Login,
	Main,
	Title,
	Form,
	Buttons,
	ContinueDiv,
	Text,
	SignUpButton,
	Span,
	AgreeDiv,
	Error,
} from './style';
import LogoImg from '../../assets/logo_pequeno.svg';
import { useNavigate } from 'react-router-dom';
import { goToLoginPage, goToPostsPage } from '../../routes/coordinator';
import Input from '../../components/input/input';
import { useState } from 'react';
import { BASE_URL, TOKEN } from '../../constants/url';
import axios from 'axios';

export default function SignUpPage() {
	const [nick, setNick] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [erro, setErro] = useState('');

	const navigate = useNavigate();

	const handleLoginClick = () => {
		goToLoginPage(navigate);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = {
				nick: nick,
				email: email,
				password: password,
			};

			const response = await axios.post(BASE_URL + '/users/signup', body);
			window.localStorage.setItem(TOKEN, response.data);

			goToPostsPage(navigate);
		} catch (error) {
			setErro(error.response.data);
		}
	};

	return (
		<>
			<Header>
				<Logo src={LogoImg} alt="" width={'28px'} />
				<Login onClick={handleLoginClick}>Entrar</Login>
			</Header>
			<Main>
				<Title>Olá, boas vindas ao LabEddit ;)</Title>
				<Error>{erro}</Error>
				<Form onSubmit={handleSubmit}>
					<Buttons>
						<Input
							placeHolder="Apelido"
							type="text"
							value={nick}
							setValue={setNick}
						/>
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
					</Buttons>
					<ContinueDiv>
						<Text>
							Ao continuar, você concorda com o nosso{' '}
							<Span>Contrato de usuário</Span> e nossa{' '}
							<Span>Política de Privacidade</Span>
						</Text>
						<AgreeDiv>
							<input type="checkbox" />
							<Text>
								Eu concordo em receber emails sobre coisas
								legais no Labeddit
							</Text>
						</AgreeDiv>
						<SignUpButton>Cadastrar</SignUpButton>
					</ContinueDiv>
				</Form>
			</Main>
		</>
	);
}
