import  { useState,useEffect } from 'react'
import postService from '../services/postService'
import UpdateModelComponent from './UpdateModelComponent';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ShowComponent() {

    const [posts, setPost] = useState({});
    const fetchPost = async ()=>{
        setPost(await postService.getPost())
    }

   
    useEffect(()=>{
         fetchPost();
    },[posts]);
    
    const deletePost = async (id,e)=>{
      
        var response = await postService.deletePost(id);
        if (response.data.success == true) {
          alert(response.data.msg);
          document.getElementById(id).parentElement.parentElement.remove();
        } else {
          alert(response.data.msg);
        }
    }
   
  return (
    <div className='App' >
      <h1>Post</h1>
      <h5><a className='btn btn-primary' href="/">Create New Post</a></h5>
     {posts.data != undefined && posts.data.data.length > 0 &&
     (
      <table style={{ width: '100%' }} border='1' >
        <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Edit</th>  
            </tr>
        </thead>
        <tbody >
          {posts.data.data.map(post =>(

            <tr>
              <td>{post.title}</td>
              <td>{post.date}</td>
              <td> <img src={'http://localhost:5000/api/postImages/'+post.image} alt="" style={{ width: '100px',height: '100px' }} /> </td>
              <td><button className='btn btn-danger'  id={post._id} onClick={(e) => deletePost(post._id,e) } >Delete</button></td>
              <td> <UpdateModelComponent id={post._id} title={post.title} date={post.date} /> </td>
            </tr>

          ))}
        </tbody>
      </table>

     )}
   
    
    </div>

  )
}

export default ShowComponent