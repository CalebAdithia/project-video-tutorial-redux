import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewPost } from "./postSlice";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useAppSelector(state =>  state.users)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const addPost = () => {
        if(canSave){
            try{
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, 'body': content, userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            }
            catch(err){
                console.error('Failed to Save New Post',err)
            }
            finally{
                setAddRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ));

    return (
        <div className="flex flex-col border broder-white p-5 rounded-xl gap-3 w-1/2">
            <p className="text-3xl text-center">Add Post Form</p>
            <input type="text" placeholder="Title" className="input w-full input-bordered " onChange={(e) => setTitle(e.target.value)} value={title}/>
            <textarea className="textarea textarea-bordered" placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
            <select className="select select-bordered w-full" onChange={(e) => {setUserId(e.target.value)}}>
                <option selected value=""></option>
                {usersOptions}
            </select>
            <button onClick={addPost} className={`rounded px-3 py-1 ${canSave ? 'bg-gray-600 text-[#FFF5EE]' : 'bg-gray-800 text-gray-700'}`} disabled={!canSave}>POST</button>
        </div>
    );
}
 
export default AddPost;