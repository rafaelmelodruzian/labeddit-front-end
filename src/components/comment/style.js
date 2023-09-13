import styled from 'styled-components';

export const CommentContainer = styled.li`
	background-color: #fbfbfb;
	border: 1px solid #e0e0e0;
	border-radius: 12px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	padding: 9px;
	row-gap: 18px;

	&:hover {
		border-color: #a8a8a8;
	}
`;

export const User = styled.small`
	color: #6f6f6f;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 0.75rem;
	font-weight: 400;
	line-height: normal;
`;

export const Content = styled.p`
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 400;
	line-height: normal;
`;

export const RoundContainer = styled.div`
	align-items: center;
	border: 0.8px solid #ececec;
	border-radius: 28px;
	color: #6f6f6f;
	column-gap: 15px;
	display: flex;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 0.625rem;
	font-weight: 700;
	height: 28px;
	justify-content: space-between;
	padding: 4.7px 10px;

	&:hover {
		background-color: #ededed;
	}
`;

export const LikesComments = styled.div`
	align-items: center;
	column-gap: 11px;
	display: flex;
`;

export const Button = styled.button`
	background-color: #fbfbfb;
	border: 0.8px solid #ececec;
	border-radius: 28px;
	color: #6f6f6f;
	cursor: pointer;
	display: inline-block;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 0.875rem;
	height: 39.4px;
	padding: 4.7px 10px;

	&:hover {
		background-color: #ededed;
	}
`;

export const DeleteDiv = styled.div`
	display: flex;
	color: #6f6f6f;
	column-gap: 10px;
	line-height: normal;
`;

export const EditContent = styled.textarea`
	background-color: #fbfbfb;
	border: none;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 8px;
	padding: 0;
	resize: none;
	width: 100%;

	&:focus {
		outline: none;
	}
`;
