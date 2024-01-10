import React from 'react';
import { default as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForms = ({ id, setComments }) => {
  const { request, error } = useFetch();
  const [comment, setComment] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="commnet"
        name="comment"
        value={comment}
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <img src={Enviar} alt="logo do button" />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForms;
