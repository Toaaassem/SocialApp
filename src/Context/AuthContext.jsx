import React, { createContext, useContext, useEffect, useState } from 'react'

export const authContext=createContext()


export default function AuthContextProvider({children}) {

const [userToken, setuserToken] = useState(function(){
  return localStorage.getItem("token")
});

// the solution up is better because it is in the initial render it will get the value only once not after the ui 

// useEffect(function(){
//     const localStorageValue = localStorage.getItem('token');
//     if(localStorageValue != null ){
//         setuserToken(localStorageValue)
//     }
// },[])

function setAuthUserToken(tkn){
setuserToken(tkn)
}
function clearUserToken(tkn){
setuserToken(null)
}
console.log(userToken)
  return (
    <authContext.Provider value={{userToken , setAuthUserToken,clearUserToken}}>
        {children}
    </authContext.Provider>
  )
}
