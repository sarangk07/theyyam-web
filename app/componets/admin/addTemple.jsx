import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

function AddTemple() {
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    // State for Temple form
    const [templeFormData, setTempleFormData] = useState({
        name1: '',
        Place1: '',
        Location1: '',
        Phone1: '',
        Address1: '',
        img1: null,
        imgs1: null,
        popularity1: '',
        duration1: '',
        start1: '',
        end1: '',
        malayala_masam1: ''
    });


    // Handle Temple form input changes
    const handleTempleChange = (e) => {
        const { name, value, type, files } = e.target;
        setTempleFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };


    // Handle Temple form submission
    const handleSubmitTemple = async (e) => {
        e.preventDefault();
        setMessage('Submitting...');
        const token = localStorage.getItem('adminToken');

        try {
            const formData = new FormData();
            
            // Append all form fields
            Object.keys(templeFormData).forEach(key => {
                // Don't append null or undefined values
                if (templeFormData[key] != null) {
                    // Handle file inputs specially
                    if (key === 'img1' || key === 'imgs1') {
                        if (templeFormData[key] instanceof File) {
                            formData.append(key, templeFormData[key]);
                        }
                    } else {
                        formData.append(key, templeFormData[key]);
                    }
                }
            });

            const response = await fetch('/api/temples', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Temple added successfully!');
                // Reset form
                setTempleFormData({
                    name1: '',
                    Place1: '',
                    Location1: '',
                    Phone1: '',
                    Address1: '',
                    img1: null,
                    imgs1: null,
                    popularity1: '',
                    duration1: '',
                    start1: '',
                    end1: '',
                    malayala_masam1: ''
                });
            } else {
                setMessage(`Error: ${data.error || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(`Error: ${error.message}`);
        }
    };





    return (
        <>
        <div className='flex flex-col items-center w-full'>
            <h2 className='text-lg text-white'>Add Temples</h2>
            {message && <p className="text-white">{message}</p>}
            <form className='flex bg-zinc-800 rounded-md p-4 text-zinc-100 flex-col items-center justify-center w-[80%] md:w-[60%]' onSubmit={handleSubmitTemple}>
                <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Name*' name='name1' value={templeFormData.name1 || ''} onChange={handleTempleChange} required />
                <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Place*' name='Place1' value={templeFormData.Place1 || ''} onChange={handleTempleChange} required />
                <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Location' name='Location1' value={templeFormData.Location1 || ''} onChange={handleTempleChange} />
                <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Phone' name='Phone1' value={templeFormData.Phone1 || ''} onChange={handleTempleChange} />
                <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='Address' name='Address1' value={templeFormData.Address1 || ''} onChange={handleTempleChange} />
                
                <div className='m-0 p-0 flex text-xs md:flex-row w-full'>
                    <div className='flex flex-col md:w-full w-[50%]'>
                        <label htmlFor="img1" className='text-center'>Image</label>
                        <input className='bg-zinc-600 m-1 p-1 rounded-md' type="file" name='img1' onChange={handleTempleChange} />
                    </div>
                    <div className='flex flex-col md:w-full w-[50%]'>
                        <label htmlFor="imgs1" className='text-center'>Images</label>
                        <input className='bg-zinc-600 m-1 p-1 rounded-md' type="file" name='imgs1' onChange={handleTempleChange} />
                    </div>   
                </div>

                <div className='m-0 p-0 flex w-full'>
                    <div className='flex flex-col md:w-full w-[50%]'>
                        <p>Popularity</p>
                        <input className='bg-zinc-600  m-1 p-1 rounded-md' type="number" placeholder='Popularity*' name='popularity1' value={templeFormData.popularity1 || 0} onChange={handleTempleChange} required />
                    </div>
                    <div className='flex flex-col md:w-full w-[50%]'>
                        <p>festival duration</p>
                        <input className='bg-zinc-600  m-1 p-1 rounded-md' type="number" placeholder='festival_duration_days*' name='duration1' value={templeFormData.duration1 || 0} onChange={handleTempleChange} required />
                    </div>
                </div>
                <div className='m-0 p-0 flex flex-col md:flex-row w-full'>
                    <input className='bg-zinc-600 md:w-full m-1 p-1 rounded-md' type="text" placeholder='festival_start_time*' name='start1' value={templeFormData.start1 || ''} onChange={handleTempleChange} required />
                    <input className='bg-zinc-600 md:w-full m-1 p-1 rounded-md' type="text" placeholder='festival_end_time*' name='end1' value={templeFormData.end1 || ''} onChange={handleTempleChange} required />
                </div>
                
                <input className='bg-zinc-600 w-full m-1 p-1 rounded-md' type="text" placeholder='malayala_masam*' name='malayala_masam1' value={templeFormData.malayala_masam1 || ''} onChange={handleTempleChange} required />
                
                <button className='bg-zinc-900 w-[20%] flex justify-center rounded-md' type='submit'>Submit</button>
            </form>
        </div>
        
        </>
    )
}

export default AddTemple
