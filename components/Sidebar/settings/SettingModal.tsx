import { useState } from 'react';

import { setApiKey } from '@/store/apiKeySlice';
import { useAppDispatch } from '@/store/hooks';

const SettingModal = () => {
    const [key, setKey] = useState(localStorage.getItem('apiKey') || '');
    const dispatch = useAppDispatch();

    const handleSetkey = () => {
        dispatch(setApiKey(key));
    };

    return (
        <div>
            <input type='checkbox' id='setting-modal' className='modal-toggle' />
            <label htmlFor='setting-modal' className={`modal cursor-pointer bg-fixed`}>
                <label className='modal-box relative bg-base-content [&>*]:text-base-100' htmlFor=''>
                    <h3 className='text-lg font-bold'>Your OpenAI API Key</h3>
                    <p className='py-4'>
                        You have been selected for a chance to get one year of subscription to use Wikipedia for free!
                    </p>
                    <div className='my-2'>
                        <input
                            type='text'
                            placeholder='Enter Your API Key Here'
                            className='input w-full text-neutral'
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                        />
                    </div>
                    <p>
                        <label className='label'>
                            <span className='label-text-alt'>API Key</span>
                        </label>
                    </p>
                    <div className='modal-action'>
                        <label htmlFor='setting-modal' className='btn btn-accent' onClick={handleSetkey}>
                            Save & Close
                        </label>
                    </div>
                </label>
            </label>
        </div>
    );
};
export default SettingModal;
