export const goToLoginPage = (navigate) => {
	navigate('/login');
};

export const goToSignUpPage = (navigate) => {
	navigate('/signup');
};

export const goToPostsPage = (navigate) => {
	navigate('/posts');
};

export const goToCommentsPage = (navigate, postId, userId) => {
	navigate('/comments', {
		state: { postId, userId },
	});
};
