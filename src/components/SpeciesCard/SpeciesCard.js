import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import './SpeciesCard.css';
import { AuthContext } from '../../contexts/AuthContext';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import { likeOne, dislikeOne, commentOne } from '../../services/speciesService';


const SpeciesCard = ({
    species
}) => {
    const { currentUser } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);

    const isOwner = currentUser?.email === species.owner;
    const speciesId = species.id;

    const [like, setLike] = useState(species.likes || []);
    const [comment, setComment] = useState(species.comments || []);
    const [isShow, setIsShow] = useState(false);

    const toggleComments = () => {
        setTimeout(() => {
            setIsShow(!isShow);
        }, 500);
    };

    const likeAction = async () => {
        await likeOne(speciesId, currentUser.email)
            .then(() => {
                like.push(currentUser.email);
                setLike([...like]);
                showNotification(`You liked ${species.species}!`, types.success);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }

    const dislikeAction = async () => {
        let userIndex = like.indexOf(currentUser.email) || 0;

        await dislikeOne(speciesId, currentUser.email)
            .then(() => {
                let removedUser = like?.splice(userIndex, 1);
                setLike([...like]);
                showNotification(`You disliked ${species.species}!`, types.success);
                return removedUser;
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
                comment.unshift(currentComment);
                setComment([...comment]);
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

    const likesCount = <h3 className="likes-count">Likes: {like?.length}</h3>;

    const likes = (
        <div className="card-likes">
            { like?.length > 0 && like?.includes(currentUser?.email)
                ? <div className="heart active" onClick={ dislikeAction }>&#10084;</div>
                : ''
            }
            { !like?.includes(currentUser?.email)
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
            { comment?.length > 0
                ? comment.map((c) => (
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