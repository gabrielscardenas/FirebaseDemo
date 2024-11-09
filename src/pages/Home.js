import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

// styles
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState(null);
  const navigate = useNavigate(); // For navigation to the edit page

  useEffect(() => {
    const ref = collection(db, 'articles');

    // Set up real-time listener using onSnapshot
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Handle article deletion
  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id);
    await deleteDoc(ref);
  };

  // Handle edit button click to navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit page with the article ID in the URL
  };

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles && articles.map((article) => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          
          {/* Delete button */}
          <img
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon}
            alt="delete icon"
          />
          
          {/* Edit button */}
          <FontAwesomeIcon
            icon={faEdit}
            className="icon edit-icon"
            onClick={() => handleEdit(article.id)}
          />
        </div>
      ))}
    </div>
  );
}
