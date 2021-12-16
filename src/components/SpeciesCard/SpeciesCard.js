import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SpeciesCard.css';

import { AuthContext } from '../../contexts/AuthContext';
import { types, NotificationContext } from '../../contexts/NotificationContext';

import { likeOne, commentOne } from '../../services/speciesService';


const SpeciesCard = ({
    species
}) => {
    const { currentUser } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);

    const isOwner = currentUser?.email === species.owner;
    const speciesId = species.id;

    const [like, setLike] = useState(species.likes);
    const [comment, setComment] = useState(species.comments);
    const [isShow, setIsShow] = useState(false);

    const toggleComments = () => {
        setTimeout(() => {
            setIsShow(!isShow);
        }, 500);
    };

    const likeAction = async () => {
        await likeOne(speciesId, currentUser.email)
            .then(() => {
                setLike(state => ({ ...state, likes: like.push(currentUser.email) }));
                showNotification(`You liked ${species.species}!`, types.success);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }

    const commentAction = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const currentComment = formData.get('comment').trim();

        if (currentComment === '') {
            return showNotification('You are trying to send an empty comment!', types.warning);
        }

        await commentOne(speciesId, currentComment)
            .then(() => {
                setComment(state => ({ ...state, comments: comment.push(currentComment) }));
                showNotification(`You commented ${species.species}!`, types.success);
                e.target.reset();
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }

    const ownerButtons = (
        <div className="owner-buttons">
            <Link to={`/all-species/${species.id}/edit`} className="card-btn">
                <span className="card-icon">&#9998;</span> Edit
            </Link>
            <Link to={`/all-species/${species.id}/delete`} className="card-btn">
                <span className="card-icon">&#128465;</span> Delete
            </Link>
        </div>
    )

    const likesCount = <h3 className="likes-count">Likes: {species.likes?.length}</h3>;

    const likes = (
        <div className="card-likes">
            { species.likes?.length > 0 && species.likes?.includes(currentUser?.email)
                ? <div className="heart active">&#10084;</div>
                : ''
            }
            { !species.likes?.includes(currentUser?.email)
                ? <div className="heart" onClick={ likeAction }>&#10084;</div>
                : ''
            }
        </div>
    )

    const comments = (
        <div className="comments-body">
            { currentUser !== null
                ? (
                    <form onSubmit={ commentAction } autoComplete="off">
                        <input type="text" name="comment" placeholder="Write comment..." />
                        <input className="submit" type="submit" value="&#9993; Send"/>
                    </form>
                )
                : ''
            }
            { species.comments?.length > 0
                ? species.comments.map((c) => (
                    <div className="comment-row" key={Math.floor(Math.random()*10000000)}>
                        <span
                            className="avatar"
                            style={{ backgroundColor: `#${Math.floor(Math.random()*1000000)}` }}>
                            &#128462;
                        </span>
                        <p className="comment">{c}</p>
                    </div>
                ))
                : <p>No comments yet...</p>
            }
        </div>
    )

    return (
        <div className="species-card" key={species.id}>
            <div className="flex">
                <img src={species.image} alt="" />
                <div>
                    <h2><span>Species:</span> {species.species}</h2>
                    <p><span>Planet:</span> {species.planet}</p>
                    <p><span>Lifespan:</span> {species.lifespan} yrs</p>
                    <p><span>Description:</span> {species.description}</p>
                </div>
            </div>
            <div className="card-owner-details">
                <p className="card-owner"><span>Added by:</span> {species.owner}</p>
                <div className="flex-end">
                    { likesCount }
                    { currentUser !== null && isOwner === true ? ownerButtons : '' }
                    { currentUser !== null && isOwner !== true ? likes : '' }
                </div>
            </div>
            <hr />
            <div className="comments">
                <div className="comments-header">
                    <h3>Comments: {species.comments?.length}</h3>
                    <div className="card-btn" onClick={ toggleComments }>{ isShow ? 'Hide all' : 'Show all' }</div>
                </div>
                { isShow ? comments : '' }
            </div>
        </div>
    );
}

export default SpeciesCard;