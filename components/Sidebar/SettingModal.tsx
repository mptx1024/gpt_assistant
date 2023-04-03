import { useState } from 'react';

interface Props {}
const SettingModal = (props: Props) => {
    return (
        <div>
            <input type='checkbox' id='setting-modal' className='modal-toggle debug-1' />
            <label htmlFor='setting-modal' className={`modal cursor-pointer bg-fixed`}>
                <label className='modal-box relative' htmlFor=''>
                    <h3 className='text-lg font-bold'>Congratulations random Internet user!</h3>
                    <p className='py-4'>
                        You have been selected for a chance to get one year of subscription to use Wikipedia for free!
                    </p>
                    <div className='modal-action'>
                        <label htmlFor='setting-modal' className='btn'>
                            Yay!
                        </label>
                    </div>
                </label>
            </label>
        </div>
    );
};
export default SettingModal;
