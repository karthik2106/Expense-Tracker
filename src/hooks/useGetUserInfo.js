

export const useGetUserInfo = ()=>{
    const {
        name, profilePhoto,userID, isAuth
    } = JSON.parse(localStorage.getItem("auth")); // changing from string to obj

    return {name , profilePhoto , userID, isAuth }
}