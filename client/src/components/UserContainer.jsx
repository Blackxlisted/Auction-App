import React from 'react'

function UserContainer({ user, login, logout }) {
  return (
    <>
        {user ? 
            (
                <>
                    <li className='!no-underline grid grid-cols-[1fr_auto] items-center gap-2'>
                        Hello, {user?.name}
                        <img src={user?.picture} className='w-6 rounded-sm'/>
                    </li>
                    <button onClick={() => {
                        logout({ returnTo: window.location.origin });
                    }} className='btn'>Logout</button>
                </>
            ) :
            (
                <li>
                    <button onClick={login} className='btn'>Login</button>
                </li>
            )

        }
    </>
  )
}

export default UserContainer