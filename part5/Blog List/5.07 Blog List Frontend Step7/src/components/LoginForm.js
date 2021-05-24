import React from 'react'

const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange, username, password}) => {
   return (
      <form onSubmit={handleLogin}>
         <div>
            username:
            <input type="text" value={username} name="Username" onChange={handleUsernameChange} />
         </div>
         <div>
            password:
            <input type="password" value={password} name="Password" onChange={handlePasswordChange} />
         </div>

         <button type="submit">login</button>
      </form>
   )
}

export default LoginForm