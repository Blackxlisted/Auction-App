import React from 'react'

function UserContainer({ user, login, logout }) {
  return (
    <>
        {user ? 
            (
                <>
                    <div className='!no-underline grid grid-cols-[1fr_auto] items-center gap-2'>
                        Hello, {user?.name}
                        <img src={user?.picture} className='w-10 rounded-sm'/>
                    </div>
                    <button onClick={() => {
                        logout({ returnTo: window.location.origin });
                    }} className=' hover:bg-gray-200 hover:font-bold active:bg-gray-300 active:font-bold'>Logout</button>
                </>
            ) :
            (
                <div>
                    <button onClick={login} className=' hover:bg-gray-200 hover:font-bold active:bg-gray-300 active:font-bold'>Login</button>
                </div>
            )

        }
    </>
  )
}

export default UserContainer