import { useAppSelector } from "../../app/hooks"; 
import { Link } from "react-router-dom";
const UsersList = () => {
    const users = useAppSelector(state => state.users)

    const renderedUsers = users.map(user => (
        <li key={user.id} className="underline underline-offset-4">
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))
    return (
        <section>
            <h2 className="text-xl font-bold">Users</h2>
            <ul className="list-disc">{renderedUsers}</ul>
        </section>
    );
}
 
export default UsersList;