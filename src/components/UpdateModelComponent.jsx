import {useState} from 'react';
import { Modal,Button } from 'react-bootstrap';
import postService from '../services/postService';

function UpdateModelComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const [title,setTitle] = useState(props.title);
    const [id,setId] = useState(props.id);
    const [date,setDate] = useState(props.date);
    const [selectedFile,setselectedFile] = useState('');

    const initModal = () =>{
        return invokeModal(!isShow);
    }
    const handleSubmit = async (event)=>{
      event.preventDefault();

      const formData = new FormData();
    
      // Append form data to formData object
      formData.append('id',id)
      formData.append('title', title);
      formData.append('date', date);

      if (selectedFile != '' && selectedFile.length !=0) {
        formData.append('image', selectedFile);
      }
      const response = await postService.update(formData);
      if (response.data.success == true) {
        alert(response.data.msg);
      }else{
        alert(response.data.msg);
      }
      initModal();
    }

    return (
    <>
      <Button variant='success' onClick={initModal} >Edit</Button> 

      <Modal show={isShow} >
        <Modal.Header closeButton onClick={initModal} >
            <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
            <form onSubmit={handleSubmit} >
            <Modal.Body>
                <input type="text" name="title" placeholder='Enter Title' value={title} onChange={event=> setTitle(event.target.value) } required />
                <br/><br/>
                <input type="date" name="date" value={date} onChange={event=> setDate(event.target.value) } required />
                <br/><br/>
                <input type="file" name="image" onChange={event => setselectedFile(event.target.files[0])} />
            </Modal.Body>

        <Modal.Footer>
            <Button variant='danger' onClick={initModal} >Close</Button>
            <Button type='submit' variant='dark'  >Update</Button>
        </Modal.Footer>
        </form>
      </Modal> 
    </>
  )
}

export default UpdateModelComponent