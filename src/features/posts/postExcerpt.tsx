import { useAppSelector } from "../../app/hooks";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { selectPostById } from "./postSlice";

// type TPost = { 
//     id: string, 
//     title: string, 
//     content: string,
//     userId: number,
//     date : any
//     reactions : {
//         thumbsUp : number,
//         hooray : number,
//         heart : number,
//         rocket : number,
//         eyes : number
//     }
// }

const PostExerpt = ({postId} : any) => {
    const post = useAppSelector(state => selectPostById(state, postId)) 
    
    return (
        <article className="border p-4 rounded w-full flex flex-col gap-y-1">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-lg">{post.body.substring(0, 100)}</p>
            <PostAuthor userId={post.userId}></PostAuthor>
            <div className="flex">
                <ReactionButtons post={post}></ReactionButtons>
                <TimeAgo timestamp={post.date}></TimeAgo>
            </div>
            <p><Link to={`post/${post.id}`} className="hover:text-[#FFF5EA] underline underline-offset-4">View Post</Link></p>
        </article>
    );
}
 
export default PostExerpt;

/*
let PostExerpt = ({post} : any) => {
    return (
        <article className="border p-4 rounded w-full flex flex-col gap-y-1">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-lg">{post.body.substring(0, 100)}</p>
            <PostAuthor userId={post.userId}></PostAuthor>
            <div className="flex">
                <ReactionButtons post={post}></ReactionButtons>
                <TimeAgo timestamp={post.date}></TimeAgo>
            </div>
            <p><Link to={`post/${post.id}`} className="hover:text-[#FFF5EA] underline underline-offset-4">View Post</Link></p>
        </article>
    );
}

PostExerpt = memo(PostExerpt)
export default PostExerpt;*/