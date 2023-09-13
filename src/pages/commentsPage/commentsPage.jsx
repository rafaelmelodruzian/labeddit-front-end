import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { goToLoginPage, goToPostsPage } from "../../routes/coordinator";
import {
  CommentList,
  Header,
  Line,
  Logo,
  Logout,
  Main,
  NewComment,
  NewCommentButton,
  WriteComment,
} from "./style";
import { BASE_URL, TOKEN } from "../../constants/url";
import LogoImg from "../../assets/logo_pequeno.svg";
import Fechar from "../../assets/fechar.svg";
import PostComponent from "../../components/post/post";
import { GlobalContext } from "../../global/globalContext";
import axios from "axios";
import CommentComponent from "../../components/comment/comment";

export default function CommentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { postId, userId } = location.state;
  const { states, setters } = useContext(GlobalContext);
  const [commentContent, setCommentContent] = useState("");
  const [shouldRender, setShouldRender] = useState(true);

  const handleLogoutClick = () => {
    window.localStorage.removeItem(TOKEN);
    goToLoginPage(navigate);
  };

  const handleBackToPosts = () => {
    goToPostsPage(navigate);
  };

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const createNewComment = async () => {
    try {
      const headers = {
        Authorization: window.localStorage.getItem(TOKEN),
      };
      const body = {
        content: commentContent,
      };
      await axios.post(BASE_URL + "/comments/" + postId, body, {
        headers,
      });
      setCommentContent("");
      setters.fetchPost();

      setForceRerender(!forceRerender);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeOrDislike = async () => {
    setForceRerender(!forceRerender);
  };

  useEffect(() => {
    setters.fetchPost(postId);
  }, [shouldRender, postId]);

  useEffect(() => {
    setters.fetchComments(postId);
  }, [shouldRender, postId]);

  return (
    <>
      <Header>
        <img src={Fechar} alt="Botão de voltar" onClick={handleBackToPosts} />
        <Logo src={LogoImg} alt="" width={"28px"} />
        <Logout onClick={handleLogoutClick}>Logout</Logout>
      </Header>
      <Main>
        <WriteComment>
          {states.post ? (
            <PostComponent post={states.post} userId={userId} />
          ) : (
            <div>Carregando...</div>
          )}
          <NewComment
            value={commentContent}
            onChange={handleCommentContentChange}
            placeholder="Adicionar comentário"
          />
          <NewCommentButton onClick={createNewComment}>
            Responder
          </NewCommentButton>
        </WriteComment>
        <Line />
        <CommentList>
          {states.comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}
              onLikeOrDislike={handleLikeOrDislike}
            />
          ))}
        </CommentList>
      </Main>
    </>
  );
}
