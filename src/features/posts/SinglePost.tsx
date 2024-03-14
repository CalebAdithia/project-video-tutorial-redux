import { useAppSelector} from "../../app/hooks";
import { selectPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link, useParams, useNavigate } from "react-router-dom";


const SinglePost = () => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const post = useAppSelector(state => selectPostById(state, Number(postId)))
    console.log(post)
    if(!post){
        return (
            <section>
                <h2>Post Not Found</h2>
            </section>
        )
    }

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <>
            <article className="border p-4 rounded w-full flex flex-col gap-y-1">
                <h3 className="text-xl font-bold">{post?.title}</h3>
                <p className="text-lg">{post?.body}</p>
                <PostAuthor userId={post?.userId}></PostAuthor>
                <div className="flex">
                    <ReactionButtons post={post}></ReactionButtons>
                    <TimeAgo timestamp={post?.date}></TimeAgo>
                </div>
                <p><Link to={`/post/edit/${post.id}`} className="hover:text-[#FFF5EA] underline underline-offset-4">Edit Post</Link></p>
            </article>
            <button className="border py-1 px-2 rounded self-start hover:text-[#FFF5EA]" onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
 
export default SinglePost;