import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN } from '../constants/url';

const useProtectedPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem(TOKEN);

		if (!token) {
			console.log("no tok protecd")
			navigate('/');
		}
	}, [navigate]);
};

export default useProtectedPage;
