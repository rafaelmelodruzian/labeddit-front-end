import axios from 'axios';
import { BASE_URL, TOKEN } from '../constants/url';
import { GlobalContext } from './globalContext';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function GlobalState({ children }) {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);
	const [userId, setUserId] = useState('');

	const fetchPosts = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const response = await axios.get(BASE_URL + '/posts/', {
				headers,
			});
			const id = await axios.get(BASE_URL + '/users/', {
				headers,
			});
			setUserId(id.data);
			setPosts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchPost = async (postId) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const response = await axios.get(BASE_URL + '/posts/' + postId, {
				headers,
			});
			const id = await axios.get(BASE_URL + '/users/', {
				headers,
			});
			setUserId(id.data);
			setPost(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchComments = async (postId) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const response = await axios.get(BASE_URL + '/comments/' + postId, {
				headers,
			});
			setComments(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLikeDislikePost = async (postId, like) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const body = {
				like: like,
			};
			await axios.put(BASE_URL + '/posts/' + postId + '/like', body, {
				headers,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleLikeDislikeComment = async (commentId, like) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const body = {
				like: like,
			};
			await axios.put(
				BASE_URL + '/comments/' + commentId + '/like',
				body,
				{
					headers,
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditPost = async (postId, editedContent) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const body = {
				content: editedContent,
			};
			await axios.put(BASE_URL + '/posts/' + postId, body, { headers });
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditComment = async (commentId, editedContent) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const body = {
				content: editedContent,
			};
			await axios.put(BASE_URL + '/comments/' + commentId, body, {
				headers,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletePost = async (postId) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			await axios.delete(BASE_URL + '/posts/' + postId, { headers });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteComment = async (commentId) => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			await axios.delete(BASE_URL + '/comments/' + commentId, { headers });
		} catch (error) {
			console.log(error);
		}
	};

	const states = { posts, post, comments, userId };
	const setters = {
		fetchPost,
		fetchPosts,
		fetchComments,
		handleLikeDislikePost,
		handleLikeDislikeComment,
		handleEditPost,
		handleEditComment,
		handleDeletePost,
		handleDeleteComment
	};

	return (
		<GlobalContext.Provider value={{ states, setters }}>
			{children}
		</GlobalContext.Provider>
	);
}
