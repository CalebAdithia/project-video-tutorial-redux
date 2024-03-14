import { PayloadAction, createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import {sub} from 'date-fns'
import axios from 'axios'

const postAdapter = createEntityAdapter({
    sortComparer : (a,b) => b.date.localeCompare(a.date)
})

type TInitial = {
    posts : any,
    status : string,
    error : string | undefined,
    count : number
}

const initialState = postAdapter.getInitialState({
    status : 'idle',
    error: '',
    count : 0
})
  
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded : (state,action: PayloadAction<{ postId: string, reaction: keyof TInitial['reactions'] }>) => {
            const {postId, reaction} = action.payload
            const existingPost = state.entities[postId]
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        increaseCount : (state) => {
            state.count = state.count + 1
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), {minutes : min++ }).toISOString()
                post.reactions = {
                    thumbsUp : 0,
                    hooray : 0,
                    heart : 0,
                    rocket : 0,
                    eyes : 0
                }
                return post
            })
            postAdapter.upsertMany(state, loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            if(action.error?.message) state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions = {
                thumbsUp : 0,
                hooray : 0,
                heart : 0,
                rocket : 0,
                eyes : 0
            }
            postAdapter.addOne(state, action.payload)
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('update not complete')
                console.log(action.payload)
                return
            }
            action.payload.date = new Date().toISOString()
            postAdapter.upsertOne(state, action.payload)
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Delete not complete')
                console.log(action.payload)
                return
            }
            const {id} = action.payload
            postAdapter.removeOne(state, Number(id))
        })
    }
});

export const {reactionAdded, increaseCount} = postsSlice.actions

export default postsSlice.reducer

export const {
    selectAll : selectAllPosts,
    selectById : selectPostById,
    selectIds : selectPostIds,
} = postAdapter.getSelectors(state => state.posts)

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return [...response.data]
    }
    catch(err : any){
        return err.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost : any) => {
    try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', initialPost)
        return response.data
    }
    catch(err : any){
        return err.message
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost : any) => {
    const {id} = initialPost
    try{
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, initialPost)
        return response.data
    }
    catch(err : any){
        // return err.message
        return initialPost
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost : any) => {
    const {id} = initialPost
    console.log(id)
    try{
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(response?.status === 200) return initialPost
        return `${response?.status} : ${response?.statusText}`
    }
    catch(err : any){
        return err.message
    }
})

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => {
        const filter = posts.filter(post => post.userId === userId)
        return filter
    }
)