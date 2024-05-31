import {useState} from 'react';
import { Modal,Button } from 'react-bootstrap';

function UpdateModelComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const [title,setTitle] = useState(props.title);
    const [id,setId] = useState(props.id);
    const [date,setDate] = useState(props.date);
    const [selectedFile,setselectedFile] = useState('');

    const initModal = () =>{
        return invokeModal(!isShow);
    }
    return (
    <>
      <Button variant='success' onClick={initModal} >Edit</Button> 

      <Modal show={isShow} >
        <Modal.Header closeButton onClick={initModal} >
            <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
            <form >
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