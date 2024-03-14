import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { updatePost, deletePost, selectPostById } from "./postSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditPost = () => {
    const {postId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useAppSelector(state => state.users)
    const post : any = useAppSelector(state => selectPostById(state, Number(postId)))
    console.log(post)
    const [title, setTitle] = useState(post?.title || '')
    const [content, setContent] = useState(post?.body  || '')
    const [userId, setUserId] = useState(post?.userId  || '')
    const [RequestStatus, setRequestStatus] = useState('idle')

    const canSave = [title, content, userId].every(Boolean) && RequestStatus === 'idle'

    if(!post){
        return (
            <section>
                <h2>Post Not Found</h2>
            </section>
        )
    }   

    const HandleAddPost = () => {
        if(canSave){
            try{
                setRequestStatus('pending')
                dispatch(updatePost({ id: postId, title, 'body': content, userId, reactions: post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }
            catch(err){
                console.error('Failed to Update Post',err)
            }
            finally{
                setRequestStatus('idle')
            }
        }
    }

    const HandleDeletePost = () => {
        try{
            setRequestStatus('pending')
            dispatch(deletePost({ id: postId})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/`)
        }catch (err){
            console.error('Failed to Delete Post',err)
        }
        finally{
            setRequestStatus('idle')
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ));

    if(post) {
        return (
            <div className="flex flex-col border broder-white p-5 rounded-xl gap-3 w-1/2">
                <p className="text-3xl text-center">Edit Post Form</p>
                <input type="text" placeholder="Title" className="input w-full input-bordered " onChange={(e) => setTitle(e.target.value)} value={title}/>
                <textarea className="textarea textarea-bordered " placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                <select className="select select-bordered w-full" defaultValue={userId} onChange={(e) => {setUserId(Number(e.target.value))}}>
                    <option selected value=""></option>
                    {usersOptions}
                </select>
                <button onClick={HandleAddPost} className={`rounded px-3 py-1 ${canSave ? 'bg-gray-600 text-[#FFF5EE]' : 'bg-gray-800 text-gray-700'}`} disabled={!canSave}>Post</button>
                <button onClick={HandleDeletePost} className={`rounded px-3 py-1 bg-red-500 text-[#FFF5EE]`}>Delete</button>
                <button className="border py-1 px-2 rounded hover:text-[#FFF5EA]" onClick={() => navigate(-1)}>Back</button>
            </div>  
        );
    }
}
 
export default EditPost;