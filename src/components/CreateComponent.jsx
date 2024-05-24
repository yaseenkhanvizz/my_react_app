import React, { useState } from 'react';
import postService from '../services/postService';

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
    
        event.target.reset(); // Reset the form after submission
    }

    return (
        <div>
            <h2>Welcome yasin</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    Title:
                    <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br /><br/>
                <label>
                    Date:
                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <br /><br />
                <label>
                    Image:
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} required />
                </label>
                <br /><br />
              
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreateComponent;
