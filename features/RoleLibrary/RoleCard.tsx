interface Props {
    title: number;
    bgColor: string;
}

const RoleCard = (props: Props) => {
    return (
        <a
            className={`rounded-xl p-2 sm:p-4 lg:p-6 hover:scale-105 transition duration-300 ease-in-out ${props.bgColor}`}
            href=''
        >
            <div className='mt-6'>
                <h3 className='text-lg font-bold text-white sm:text-xl'>{props.title}</h3>

                <p className='mt-2 text-sm text-gray-500 '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                </p>
            </div>
        </a>
    );
};
export default RoleCard;

 // flex box
{/* <a
className={`hover:basis-1/2 basis-1/4 flex-1 rounded-xl p-2 sm:p-4 lg:p-6 hover:scale-105 transition duration-300 ease-in-out ${props.bgColor}`}
href=''
>
<div className='mt-6'>
    <h3 className='text-lg font-bold text-white sm:text-xl'>{props.title}</h3>

    <p className='mt-2 text-sm text-gray-500 '>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
    </p>
</div>
</a> */}