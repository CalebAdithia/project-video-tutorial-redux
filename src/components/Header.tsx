import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { increaseCount } from "../features/posts/postSlice";

const Header = () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(state => state.posts.count)

    const handleIncreaseCount = () => {
        dispatch(increaseCount())
    }
    return (
        <header className="bg-[#FFF5EA] text-black flex gap-3 p-3 items-center">
            <h1 className="text-xl">Redux Blog</h1>
            <Link to="/" className="p-2 rounded hover:bg-black/80 hover:text-[#FFF5EA]">Home</Link>
            <Link to="post" className="p-2 rounded hover:bg-black/80 hover:text-[#FFF5EA]">Post</Link>
            <Link to="user" className="p-2 rounded hover:bg-black/80 hover:text-[#FFF5EA]">Users</Link>
            <button className="p-2 rounded hover:bg-black/80 hover:text-[#FFF5EA]" onClick={handleIncreaseCount}>{count}</button>
        </header>
    );
}
 
export default Header;