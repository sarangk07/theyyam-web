import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';


function AddTheyyam() {
    const [message, setMessage] = useState('');
    const router = useRouter();

     // State for Theyyam form
     const [formData, setFormData] = useState({
        name: '',
        descriptions: '',
        img: null,
        imgs: null,
        popularity: '',
        story: '',
        god: '',
        temples: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    // Handle Theyyam form input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

     /// Handle Theyyam form submission
     const handleSubmitTheyyam = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                // Append each field to FormData
                formDataToSend.append(key, formData[key]);
            }

            // Append file inputs separately
            const imgInput = document.querySelector('input[name="img"]');
            const imgsInput = document.querySelector('input[name="imgs"]');

            if (imgInput.files.length > 0) {
                formDataToSend.append('img', imgInput.files[0]); // Append single file
            }

            if (imgsInput.files.length > 0) {
                for (let i = 0; i < imgsInput.files.length; i++) {
                    formDataToSend.append('imgs', imgsInput.files[i]); // Append multiple files
                }
            }

            // Append the token to the headers
            const theyyamResponse = await fetch('/api/theyyams', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Do NOT set 'Content-Type' here; let the browser handle it
                },
                body: formDataToSend
            });

            const contentType = theyyamResponse.headers.get('Content-Type');
            
            if (contentType && contentType.includes('application/json')) {
                const result = await theyyamResponse.json();
                // Handle success case
                console.log('Theyam added successfully:', result);
                setFormData({
                    name: '',
                    descriptions: '',
                    img: null,
                    imgs: null,
                    popularity: '',
                    story: '',
                    god: '',
                    temples: ''
                });
                setMessage('Theyyam added successfully!');
            } else {
                const text = await theyyamResponse.text(); // Get raw response text for debugging
                console.error('Unexpected response:', text);
            }
        } catch (e) {
            console.error(e);
            setMessage('An error occurred. Please try again.');
        }
    };
  return (
    <>
      <div className='flex flex-col items-center w-full'>
        <h2 className='text-lg text-white'>Add Theyyams</h2>
        {message && <p className="text-white">{message}</p>}
        <form className='flex bg-zinc-800 rounded-md p-4 text-zinc-100 flex-col items-center justify-center w-[80%] md:w-[60%]' onSubmit={handleSubmitTheyyam}>
            <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Name*' name='name' value={formData.name || ''} onChange={handleChange} required />
            <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Descriptions*' name='descriptions' value={formData.descriptions || ''} onChange={handleChange} required />
            <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="file" name='img' onChange={handleChange} />
            <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="file" name='imgs' onChange={handleChange} />
            <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Story' name='story' value={formData.story || ''} onChange={handleChange} />
            
            <div className='m-0 p-0 flex flex-col md:flex-row w-full'>
                <input className='bg-zinc-600 md:w-full m-1 p-1 rounded-md' type="text" placeholder='Popularity*' name='popularity' value={formData.popularity || ''} onChange={handleChange} required />
                <input className='bg-zinc-600 md:w-full m-1 p-1 rounded-md' type="text" placeholder='God' name='god' value={formData.god || ''} onChange={handleChange}  />
            </div>
            
            <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Temples' name='temples' value={formData.temples || ''} onChange={handleChange}  />

            <button className='bg-zinc-900 w-[20%] flex justify-center rounded-md' type='submit'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default AddTheyyam
