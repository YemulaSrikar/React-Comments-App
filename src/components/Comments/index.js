import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {NameInput: '', comment: '', commentsList: []}

  onTypeInput = event => {
    this.setState({NameInput: event.target.value})
  }

  onTypeComment = event => {
    this.setState({comment: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {NameInput, comment} = this.state

    const initialContainerBackgroundColorClassNames = `initial-container 
    ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      username: NameInput,
      commented: comment,
      time: new Date(),
      isLiked: false,
      initialClassNames: initialContainerBackgroundColorClassNames,
    }
    this.setState(prevSate => ({
      commentsList: [...prevSate.commentsList, newComment],
      NameInput: '',
      comment: '',
    }))
  }

  likeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  render() {
    const {commentsList, NameInput, comment} = this.state
    const commentsCount = commentsList.length

    return (
      <div className="main-container">
        <div className="comments-img-container">
          <div className="heading-container">
            <h1 className="comments-head">Comments</h1>
            <p className="comments-desc">
              Say something about 4.0 Technologies
            </p>
            <div className="form-cont">
              <form className="form-container">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-ele"
                  onChange={this.onTypeInput}
                  value={NameInput}
                />
                <textarea
                  rows="6"
                  cols="40"
                  placeholder="Your Comment"
                  className="textarea-ele"
                  onChange={this.onTypeComment}
                  value={comment}
                />
                <button
                  type="submit"
                  className="comment-button"
                  onClick={this.onClickAddButton}
                >
                  Add comment
                </button>
              </form>
            </div>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="comment-img"
            alt="comments"
          />
        </div>
        <div className="comments-container">
          <p className="comments-count">{commentsCount}</p>
          <p className="comments-name">Comments</p>
        </div>
        <ul className="u-list">
          {commentsList.map(eachComment => (
            <CommentItem
              eachCommentItem={eachComment}
              key={eachComment.id}
              initialBackground={initialContainerBackgroundClassNames}
              likeComment={this.likeComment}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
