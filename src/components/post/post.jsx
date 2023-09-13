/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
	Button,
	Content,
	DeleteDiv,
	EditContent,
	LikesComments,
	PostContainer,
	RoundContainer,
	User,
} from './style';
import Likes from '../../assets/likes.svg';
import Liked from '../../assets/liked.png';
import Dislikes from '../../assets/dislikes.svg';
import Disliked from '../../assets/disliked.png';
import Comments from '../../assets/comments.svg';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL, TOKEN } from '../../constants/url';
import axios from 'axios';
import { goToCommentsPage, goToPostsPage } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../global/globalContext';

export default function PostComponent({ post }) {
	const { states, setters } = useContext(GlobalContext);

	const isCurrentUserPostCreator = states.userId === post.creator.id;
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(post.content);
	const textareaRef = useRef(null);
	const [userLike, setUserLike] = useState(null);
	const navigate = useNavigate();

	const checkLike = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const response = await axios.get(
				BASE_URL + '/posts/' + post.id + '/checklike',
				{
					headers,
				}
			);
			setUserLike(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkLike();
	}, [setters.handleLikeDislikePost]);

	const handleDeleteClick = (event) => {
		event.stopPropagation();
		setShowConfirmation(true);
	};

	const handleConfirmDelete = async (event) => {
		event.stopPropagation();
		await setters.handleDeletePost(post.id);
		goToPostsPage(navigate);
	};

	const handleCancelDelete = (event) => {
		event.stopPropagation();
		setShowConfirmation(false);
	};

	const handleEditClick = (event) => {
		setEditedContent(post.content)
		event.stopPropagation();
		setEditing(true);
	};

	const handleCancelEdit = (event) => {
		event.stopPropagation();
		setEditing(false);
		setEditedContent(post.content);
	};

	const handleSaveEdit = async (event) => {
		event.stopPropagation();
		await setters.handleEditPost(post.id, editedContent);
		setEditing(false);
	};

	const handleLikeDislike = async (event, like) => {
		event.stopPropagation();
		await setters.handleLikeDislikePost(post.id, like);
	};

	useEffect(() => {
		if (editing) {
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(
				editedContent.length,
				editedContent.length
			);
		}
	}, [editing]);

	const handleGoToComment = (event) => {
		event.stopPropagation();
		goToCommentsPage(navigate, post.id, states.userId);
	};

	return (
		<PostContainer onClick={(event) => handleGoToComment(event)}>
			<User>Enviado por: {post.creator.nick}</User>
			{editing ? (
				<div>
					<EditContent
						ref={textareaRef}
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<LikesComments>
						<Button onClick={(event) => handleSaveEdit(event)}>
							Salvar
						</Button>
						<Button onClick={(event) => handleCancelEdit(event)}>
							Cancelar
						</Button>
					</LikesComments>
				</div>
			) : (
				<Content>{post.content}</Content>
			)}
			<LikesComments>
				<RoundContainer>
					<img
						src={userLike === 'like' ? Liked : Likes}
						alt="Like Post"
						onClick={(event) => handleLikeDislike(event, true)}
					/>
					{post.likes - post.dislikes}
					<img
						src={userLike === 'dislike' ? Disliked : Dislikes}
						alt="Dislike Post"
						onClick={(event) => handleLikeDislike(event, false)}
					/>
				</RoundContainer>
				<RoundContainer>
					<img src={Comments} alt="Comentários" />
					{post.comments}
				</RoundContainer>
				{isCurrentUserPostCreator && (
					<Button onClick={(event) => handleEditClick(event)}>
						<img src={Edit} alt="Editar Post" />
					</Button>
				)}
				{isCurrentUserPostCreator && (
					<Button onClick={(event) => handleDeleteClick(event)}>
						<img src={Delete} alt="Deletar Post" />
					</Button>
				)}
			</LikesComments>
			{showConfirmation && (
				<DeleteDiv>
					<p>Tem certeza que deseja excluir o post?</p>
					<Button onClick={(event) => handleConfirmDelete(event)}>
						Sim
					</Button>
					<Button onClick={(event) => handleCancelDelete(event)}>
						Cancelar
					</Button>
				</DeleteDiv>
			)}
		</PostContainer>
	);
}
