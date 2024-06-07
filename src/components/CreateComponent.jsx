import React, { useState } from 'react';
import postService from '../services/postService';
import Swal from 'sweetalert2';

function CreateComponent() {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // console.log("selected file === ", image);
        // return;
        // Create a new instance of FormData
        const formData = new FormData();
    
        // Append form data to formData object
        formData.append('title', title);
        formData.append('date', date);
        formData.append('image', image);
    
        // Assuming `postService.create` is a function that sends a POST request with FormData
        const response = await postService.create(formData);
        console.log(response);
        if (response.data.success == true) {

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.msg,
            });
            setTitle('');
            setDate('');
            setImage(null);
            setMessage('');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.data.msg,
            });
        }
        event.target.reset(); // Reset the form after submission
    }

    return (
        <div>
            <h2>Welcome yasin</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    Title:
                    <input type="text" class='form-control' name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br /><br/>
                <label>
                    Date:
                    <input type="date" class='form-control'  name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <br /><br />
                <label>
                    Image:
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} required />
                </label>
                <br /><br />
              
                <button type="submit" class='btn btn-dark' >Submit</button>
            </form>
            <p>{message}</p>
            <a href="/show" className='btn btn-primary' >Go to List</a>
        </div>
    );
}

export default CreateComponent;
