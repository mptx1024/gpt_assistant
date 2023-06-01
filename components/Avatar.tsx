import { ModelParams } from '@/types';
import clsx from 'clsx';
import Gpt3Icon from './icons/gpt3.svg';
import Gpt4Icon from './icons/gpt4.svg';
import Userlogo from './icons/user.svg';

const avatarClasses = ' h-7 w-7 rounded';

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
        <Userlogo className={clsx(avatarClasses, 'fill-colorPrimary')} />
    );
};
