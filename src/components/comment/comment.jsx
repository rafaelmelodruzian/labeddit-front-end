/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from 'react';
import {
	Button,
	CommentContainer,
	Content,
	DeleteDiv,
	EditContent,
	LikesComments,
	RoundContainer,
	User,
} from './style';
import { GlobalContext } from '../../global/globalContext';
import Likes from '../../assets/likes.svg';
import Liked from '../../assets/liked.png';
import Dislikes from '../../assets/dislikes.svg';
import Disliked from '../../assets/disliked.png';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png';
import { BASE_URL, TOKEN } from '../../constants/url';
import axios from 'axios';

export default function CommentComponent({ comment }) {
	const { states, setters } = useContext(GlobalContext);
	const textareaRef = useRef(null);
	const [editedContent, setEditedContent] = useState(comment.content);
	const [editing, setEditing] = useState(false);
	const [userLike, setUserLike] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const isCurrentUserCommentCreator = states.userId === comment.creator.id;

	const checkLike = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const response = await axios.get(
				BASE_URL + '/comments/' + comment.id + '/checklike',
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
	}, [setters.handleLikeDislikeComment]);

	const handleCancelEdit = (event) => {
		event.stopPropagation();
		setEditing(false);
		setEditedContent(comment.content);
	};

	const handleSaveEdit = async (event) => {
		event.stopPropagation();
		await setters.handleEditComment(comment.id, editedContent);
		setEditing(false);
	};

	const handleLikeDislike = async (event, like) => {
		event.stopPropagation();
		await setters.handleLikeDislikeComment(comment.id, like);
	};

	const handleEditClick = (event) => {
		event.stopPropagation();
		setEditing(true);
	};

	const handleDeleteClick = (event) => {
		event.stopPropagation();
		setShowConfirmation(true);
	};

	const handleCancelDelete = (event) => {
		event.stopPropagation();
		setShowConfirmation(false);
	};

	const handleConfirmDelete = async (event) => {
		event.stopPropagation();
		await setters.handleDeleteComment(comment.id);
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

	return (
		<CommentContainer>
			<User>Enviado por: {comment.creator.nick}</User>
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
				<Content>{comment.content}</Content>
			)}
			<LikesComments>
				<RoundContainer>
					<img
						src={userLike === 'like' ? Liked : Likes}
						alt="Like Comment"
						onClick={(event) => handleLikeDislike(event, true)}
					/>
					{comment.likes - comment.dislikes}
					<img
						src={userLike === 'dislike' ? Disliked : Dislikes}
						alt="Dislike Comment"
						onClick={(event) => handleLikeDislike(event, false)}
					/>
				</RoundContainer>
				{isCurrentUserCommentCreator && (
					<Button onClick={(event) => handleEditClick(event)}>
						<img src={Edit} alt="Editar Comentário" />
					</Button>
				)}
				{isCurrentUserCommentCreator && (
					<Button onClick={(event) => handleDeleteClick(event)}>
						<img src={Delete} alt="Deletar Comentário" />
					</Button>
				)}
			</LikesComments>
			{showConfirmation && (
				<DeleteDiv>
					<p>Tem certeza que deseja excluir o Comentário?</p>
					<Button onClick={(event) => handleConfirmDelete(event)}>
						Sim
					</Button>
					<Button onClick={(event) => handleCancelDelete(event)}>
						Cancelar
					</Button>
				</DeleteDiv>
			)}
		</CommentContainer>
	);
}
