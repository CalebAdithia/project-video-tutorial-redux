import { useAppDispatch } from "../../app/hooks";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}


const ReactionButtons = ({post} : any) => {
    const dispatch = useAppDispatch()
    
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <button key={name} type="button" className="muted-button reaction-button"
            onClick={() =>
                dispatch(reactionAdded({ postId: post.id, reaction: name }))
            }
          >
            {emoji} {post.reactions[name]}
          </button>
        )
      })
    
    return <div>{reactionButtons}</div>
}
 
export default ReactionButtons;