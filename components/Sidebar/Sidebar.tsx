import { useState } from 'react';
import { AiFillHome, AiFillStar, AiFillSetting, AiOutlineClose } from 'react-icons/ai';

interface Props {
    activeTab: string;
    onTabChange: (tab: string) => void;
    toggleSidebar: () => void;
    visible: boolean;
}

export default function Sidebar({ activeTab, onTabChange, visible, toggleSidebar }: Props) {
    const sidebarClasses = `fixed top-0 left-0 transform transition-transform h-screen w-64 bg-gray-800 text-white ${
        visible ? 'translate-x-0' : '-translate-x-full'
    }`;
    return (
        <div className={sidebarClasses}>
            <div className='fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white'>
                <div className='flex flex-row justify-between items-center px-5 h-16 border-b border-gray-700'>
                    <h1 className='text-2xl font-semibold'>My App</h1>
                    <button
                        className='text-white p-2 rounded hover:bg-gray-700 focus:outline-none'
                        onClick={toggleSidebar}
                    >
                        <AiOutlineClose className='w-6 h-6' />
                    </button>
                </div>
                <nav className='mt-6'>
                    <ul>
                        {[
                            { id: 'home', label: 'Home', icon: <AiFillHome className='w-5 h-5' /> },
                            { id: 'favorites', label: 'Favorites', icon: <AiFillStar className='w-5 h-5' /> },
                            { id: 'settings', label: 'Settings', icon: <AiFillSetting className='w-5 h-5' /> },
                        ].map(({ id, label, icon }) => (
                            <li
                                key={id}
                                className={`px-6 py-2 rounded-l-lg cursor-pointer hover:bg-gray-700 
                                `}
                                onClick={() => onTabChange(id)}
                            >
                                <div className='flex items-center'>
                                    {icon}
                                    <span className='ml-4'>{label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const toggle = () => setIsOpen(!isOpen);
    // return (
    //     <>
    //         <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css' />
    //         <span className='absolute text-white text-4xl top-5 left-4 cursor-pointer' onClick={toggle}>
    //             <i className='bi bi-filter-left px-2 bg-gray-900 rounded-md' />
    //         </span>
    //         <div className='sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900'>
    //             <div className='text-gray-100 text-xl'>
    //                 <div className='p-2.5 mt-1 flex items-center'>
    //                     <i className='bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600' />
    //                     <h1 className='font-bold text-gray-200 text-[15px] ml-3'>TailwindCSS</h1>
    //                     <i className='bi bi-x cursor-pointer ml-28 lg:hidden' onClick={toggle} />
    //                 </div>
    //                 <div className='my-2 bg-gray-600 h-[1px]' />
    //             </div>
    //             <div className='p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white'>
    //                 <i className='bi bi-search text-sm' />
    //                 <input
    //                     type='text'
    //                     placeholder='Search'
    //                     className='text-[15px] ml-4 w-full bg-transparent focus:outline-none'
    //                 />
    //             </div>
    //             <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
    //                 <i className='bi bi-house-door-fill' />
    //                 <span className='text-[15px] ml-4 text-gray-200 font-bold'>Home</span>
    //             </div>
    //             <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
    //                 <i className='bi bi-bookmark-fill' />
    //                 <span className='text-[15px] ml-4 text-gray-200 font-bold'>Bookmark</span>
    //             </div>
    //             <div className='my-4 bg-gray-600 h-[1px]' />
    //             <div
    //                 className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
    //                 // onclick='dropdown()'
    //             >
    //                 <i className='bi bi-chat-left-text-fill' />
    //                 <div className='flex justify-between w-full items-center'>
    //                     <span className='text-[15px] ml-4 text-gray-200 font-bold'>Chatbox</span>
    //                     <span className='text-sm rotate-180' id='arrow'>
    //                         <i className='bi bi-chevron-down' />
    //                     </span>
    //                 </div>
    //             </div>
    //             <div className='text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold' id='submenu'>
    //                 <h1 className='cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1'>Social</h1>
    //                 <h1 className='cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1'>Personal</h1>
    //                 <h1 className='cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1'>Friends</h1>
    //             </div>
    //             <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
    //                 <i className='bi bi-box-arrow-in-right' />
    //                 <span className='text-[15px] ml-4 text-gray-200 font-bold'>Logout</span>
    //             </div>
    //         </div>
    //     </>
    // );
}
