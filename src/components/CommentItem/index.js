// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {eachCommentItem, likeComment, deleteComment} = props
  const {
    id,
    username,
    commented,
    time,
    isLiked,
    initialClassNames,
  } = eachCommentItem

  const commentTime = formatDistanceToNow(time)
  const initalName = username.slice(0, 1).toUpperCase()

  const isLikeClass = isLiked ? 'button active' : 'button'
  const likeImg =
    'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likedImg =
    'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const onClickLike = () => {
    likeComment(id)
  }

  const onDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <li className="display-comment-container">
      <div className="details-container">
        <div className={`initial-letter ${initialClassNames}`}>
          <h1 className="letter">{initalName}</h1>
        </div>
        <div>
          <div className="name-time-container">
            <p className="username">{username}</p>
            <p className="post-time">{commentTime} ago</p>
          </div>
          <p className="comment">{commented}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <img src={isLiked ? likedImg : likeImg} alt="like" />
          <button className={isLikeClass} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-img"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
