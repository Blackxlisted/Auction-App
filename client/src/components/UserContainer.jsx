import React from 'react'

function UserContainer({ user, login, logout }) {
  return (
    <>
        {user ? 
            (
                <>
                    <li className='!no-underline'>
                        Hello, {user?.username}
                    </li>
                    <button onClick={logout} className='btn'>Logout</button>
                </>
            ) :
            (
                <li>
                    <button onClick={login}>Login</button>
                </li>
            )

        }
    </>
  )
}

export default UserContainer