import React, { useEffect, useState } from 'react';

function Modal({ data }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false); 
    }, []);

    if (!data) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center 
            transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            
            <div className={`flex flex-col items-center bg-slate-700 w-full max-w-[90%] sm:max-w-[400px] h-auto 
                rounded-lg p-4 gap-4 transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
                
                <p className='text-3xl text-white'>{data.text1}</p>
                <p className='text-xl text-red-600'>{data.text2}</p>
                
                <div className='flex gap-4'>
                    <button 
                        onClick={() => { data.btn1Handler(); setIsVisible(false); }}
                        className='px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800 transition-colors duration-200'>
                        {data.btn1}
                    </button>
                    <button 
                        onClick={() => { data.btn2Handler(); setIsVisible(false); }}
                        className='px-4 py-2 rounded-lg border border-gray-300 text-white hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200'>
                        {data.btn2}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
