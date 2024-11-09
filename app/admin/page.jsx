'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TemplesView from '../componets/admin/templeView';
import AddTheyyam from '../componets/admin/addTheyyam';
import AddTemple from '../componets/admin/addTemple';
import TheyyamView from '../componets/admin/theyyamView';

function AdminHome() {
    const router = useRouter();
    const [choice1, setChoice1] = useState('default');
    const [choice2, setChoice2] = useState('default');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/');
        router.refresh();
    };

    return (
        <div className='flex flex-col bg-zinc-400 text-zinc-800 w-full h-screen'>
            <button className='absolute top-1 left-3' onClick={handleLogout}>Logout</button>
            
            <div className='flex justify-around cursor-pointer mt-5 bg-zinc-400 h-[10%] w-full'>
                <p onClick={() => setChoice1('default')}>Theyyams</p>
                <p onClick={() => setChoice1('temples')}>Temples</p>
                <p onClick={() => setChoice1('add')}>Add Datas</p>
                <p onClick={() => setChoice1('graph')}>Graphs</p>            
            </div>
            <div className='h-[90%] bg-zinc-200 w-full'> 
                {choice1 === 'add' ? 
                    <>
                        <div>
                            <div className='flex justify-around'>
                                <p className='mr-4 text-zinc-700 cursor-pointer' onClick={() => setChoice2('add-temples')}>Add Temple</p>
                                <p className='text-zinc-700 cursor-pointer' onClick={() => setChoice2('add-theyyams')}>Add Theyam</p>
                            </div>
                            <div>
                                {choice2 === 'add-temples' ? 
                                    <>
                                        <AddTemple/>
                                    </>
                                    : choice2 === 'add-theyyams' ?
                                    <>
                                        <AddTheyyam/>
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                    </>
                    : choice1 === 'temples' ? 
                    <>
                    <div className='h-full overflow-y-auto '>
                        <TemplesView />
                    </div>
                    </> 
                    :  choice1 === 'default' ? 
                    <>
                    <div className='h-full overflow-y-auto'>
                        <TheyyamView/>
                    </div>
                    </>
                    :
                    <>GPH</>
                }
            </div>
        </div>
    );
}

export default AdminHome;