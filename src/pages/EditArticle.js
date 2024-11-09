import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: '', author: '', body: '' });

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      }
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', id);
    await updateDoc(ref, article);
    navigate('/'); // Navigate to home page after updating
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={article.title} onChange={handleChange} />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={article.author} onChange={handleChange} />
      </label>
      <label>
        Body:
        <textarea name="body" value={article.body} onChange={handleChange} />
      </label>
      <button type="submit">Update Article</button>
    </form>
  );
}
