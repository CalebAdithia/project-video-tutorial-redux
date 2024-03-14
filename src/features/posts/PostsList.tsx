import { useAppSelector } from "../../app/hooks";

import PostExerpt from "./postExcerpt";
import { selectPostIds } from "./postSlice";

const PostsList = () => {
    const orderedPostsIds = useAppSelector(selectPostIds)
    const postStatus = useAppSelector(state => state.posts.status)
    const error = useAppSelector(state => state.posts.error)

    let content
    if (postStatus === 'loading') {
        content = <p>Loading...</p>
    }
    else if (postStatus === 'succeeded'){
        content = orderedPostsIds.map(postId => (
            <PostExerpt postId={postId}></PostExerpt>
        ))
    }
    else if (postStatus === 'failed'){
        content = <p>{error}</p>
    }

    return ( 
        <section className="flex flex-col items-center gap-3 border border-white rounded-xl p-5 w-1/2">
            <h2 className="text-3xl">Posts</h2>
            {content}
        </section>
    );
}
 
export default PostsList;