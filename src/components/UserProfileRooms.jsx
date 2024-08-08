import React, { useEffect, useState } from 'react'
import UserProfileRoomsDisplay from './UserProfileRoomsDisplay'

const UserProfileRooms = ({ user, sameUser }) => {
    const [tab, setTab] = useState("owned")
    const ownedRooms = user?.rooms
    const savedRooms = user?.savedRooms
    const favoriteRooms = user?.favoriteRooms

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setTab("saved")
            }
        }

        // Check screen size on component mount
        handleResize()

        // Add event listener for window resize
        window.addEventListener('resize', handleResize)

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const changeTabs = (tabName) => {
        setTab(tabName)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full sm:px-0 md:px-16 lg:px-60 mt-0 sm:mt-2'>
            <div className='px-10 flex items-center justify-center gap-5 sm:gap-10 border-b-1 border-neutral-800 w-3/4'>
                <div className={`w-36 cursor-pointer hidden sm:flex whitespace-nowrap justify-center pb-3 text-xs font-semibold transition-colors ease-in-out duration-300 ${tab === "owned" ? "border-b-2 border-white" : "text-neutral-400"}`} onClick={() => changeTabs("owned")}>
                    OWNED ROOMS
                </div>
                <div className={`w-36 px-2 cursor-pointer flex sm:hidden whitespace-nowrap justify-center pb-3 text-xs font-semibold transition-colors ease-in-out duration-300 ${tab === "owned" ? "border-b-2 border-white" : "text-neutral-400"}`} onClick={() => changeTabs("owned")}>
                    OWNED
                </div>
                <div className={`w-36 cursor-pointer hidden sm:flex whitespace-nowrap justify-center pb-3 text-xs font-semibold transition-colors ease-in-out duration-300 ${tab === "saved" ? "border-b-2 border-white" : "text-neutral-400"}`} onClick={() => changeTabs("saved")}>
                    SAVED ROOMS
                </div>
                <div className={`w-36 px-2 cursor-pointer flex sm:hidden whitespace-nowrap justify-center pb-3 text-xs font-semibold transition-colors ease-in-out duration-300 ${tab === "saved" ? "border-b-2 border-white" : "text-neutral-400"}`} onClick={() => changeTabs("saved")}>
                    SAVED
                </div>
                <div className={`w-36 cursor-pointer hidden sm:flex whitespace-nowrap justify-center pb-3 text-xs font-semibold transition-colors ease-in-out duration-300 ${tab === "favorite" ? "border-b-2 border-white" : "text-neutral-400"}`} onClick={() => changeTabs("favorite")}>
                    FAVORITE ROOMS
                </div>
                <div className={`w-36 px-2 cursor-pointer flex sm:hidden whitespace-nowrap justify-center pb-3 text-xs font-semibold transition-colors ease-in-out duration-300 ${tab === "favorite" ? "border-b-2 border-white" : "text-neutral-400"}`} onClick={() => changeTabs("favorite")}>
                    FAVORITE
                </div>
            </div>
            {tab === "owned" && (
                <UserProfileRoomsDisplay rooms={ownedRooms} sameUser={sameUser} tab={tab} />
            )}
            {tab === "saved" && (
                <UserProfileRoomsDisplay rooms={savedRooms} tab={tab} />
            )}
            {tab === "favorite" && (
                <UserProfileRoomsDisplay rooms={favoriteRooms} tab={tab} />
            )}
        </div>
    )
}

export default UserProfileRooms