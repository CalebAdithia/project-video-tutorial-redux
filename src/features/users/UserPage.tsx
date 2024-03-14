import { useAppSelector } from "../../app/hooks";
import { Link, useParams, useNavigate } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postSlice";

const UserPage = () => {
    const {userId} = useParams()
    const navigate = useNavigate()
    const user = useAppSelector(state => selectUserById(state, Number(userId)))

    const postForUser = useAppSelector(state => selectPostsByUser(state, Number(userId)))

    const postTitles = postForUser.map(post => (
        <li key={post.id} className="underline underline-offset-4">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section className="gap-3 flex flex-col">
            <h2 className="font-bold text-xl text-center">{user?.name} Post's</h2>
            <ol className="list-decimal">{postTitles}</ol>
            <button className="border py-1 px-2 rounded hover:text-[#FFF5EA]" onClick={() => navigate(-1)}>Back</button>
        </section>
    );
}
 
export default UserPage;