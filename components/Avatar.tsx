import { ModelParams } from '@/types';
import clsx from 'clsx';
import Gpt3Icon from './icons/gpt3.svg';
import Gpt4Icon from './icons/gpt4.svg';
import Userlogo from './icons/user.svg';

const avatarClasses = ' h-8 w-8 rounded';

export const Avatar = (props: { modelPrams?: ModelParams }) => {
    if (props.modelPrams) {
        return (
            <div className=''>
                {props.modelPrams.model.id.startsWith('gpt-4') ? (
                    <Gpt4Icon className={clsx(avatarClasses, ' fill-white p-1 bg-purple-600 ')} />
                ) : (
                    <Gpt3Icon className={clsx(avatarClasses, 'fill-white p-1 bg-green-700')} />
                )}
            </div>
        );
    }

    return (
        // <div className="debug-2">
        //     <Image src={Userlogo} width={100} height={50} alt="" />
        // </div>
        // <img src={Userlogo} alt='' width={50} height={50} color="white"/>
        <Userlogo className={clsx(avatarClasses, 'fill-colorPrimary')} />
    );
};
