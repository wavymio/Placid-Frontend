import { useLoading } from '../contexts/LoadingContext'
import { useSocket } from '../contexts/SocketContext'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RoomRequestAndInviteNotification = ({ notifType, notification, formatDate, loggedInUser }) => {
    const { socket } = useSocket()
    const { isRedirectLoading, setIsRedirectLoading } = useLoading()
    const [isRejectLoading, setIsRejectLoading] = useState(false)
    
    const formattedDate = formatDate(notification.date)
    const isInviteActive = loggedInUser.receivedRoomInvites.some((invite) => {
        return invite.user === notification.from._id && invite.room === notification.link.split('room/')[1]
    })

    const handleRoomRequests = async ( ev, requestType ) => {
        ev.preventDefault()

        if (requestType === "join") {
            sessionStorage.removeItem(`userIsRejoining-${notification.link.split('room/')[1]}`)
            socket.emit("joinRoom", {
                roomId: notification.link.split('room/')[1]
            })
            setIsRedirectLoading(true)
        }
    }
 
    return (
        <Link to={notifType === 'room-invite' ? notification?.link : ''} className='flex flex-col gap-1 font-bold bg-neutral-900 text-xs rounded-lg w-full h-auto py-4 px-3'>
            <div className='break-words text-start tracking-wide'>{notification?.text.charAt(0).toUpperCase() + notification?.text.slice(1)}</div>
            {isInviteActive &&
                <div className='mt-2 mb-2 w-full flex items-center gap-2 justify-center'>
                    <button disabled={isRedirectLoading} onClick={(ev) => handleRoomRequests(ev, "join")} className={`min-w-20 xs:min-w-20 bg-neutral-950 hover:bg-black p-3 xs:p-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 font-bold`}>
                        {isRedirectLoading ? (
                            <span className='loader'></span>
                        ) : (
                            <span>Join</span>
                        )}
                    </button>
                    <button disabled={isRejectLoading} onClick={(ev) => handleFriendRequests(ev, "reject")} className={`min-w-20 xs:min-w-20 bg-red-950 hover:bg-red-900 p-3 xs:p-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 font-bold`}>
                        {isRejectLoading ? (
                            <span className='loader'></span>
                        ) : (
                            <span>Reject</span>
                        )}
                    </button>
                </div>
            }
            <span className='flex items-center justify-end'>{formattedDate}</span>
        </Link>
    )
}

export default RoomRequestAndInviteNotification