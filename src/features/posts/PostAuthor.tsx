import { useAppSelector } from "../../app/hooks";

type Props = {
    userId : number
}
const PostAuthor = ({userId} : Props) => {
    const users = useAppSelector(state => state.users)
    
    const author = users.find(user => user.id === userId)
    return (
        <span>By {author ? author.name : 'Unknown Author'}</span>
    );
}
 
export default PostAuthor;