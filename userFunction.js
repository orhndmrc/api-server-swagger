
export const findUserById = (id,usersList) =>{
//const users = getUserList()
   const userFound = usersList.filter((user) => {
        if (user.id == id) {
             return user
        }   
    });
   if(userFound.length>0){
        return userFound
    }
    return false

}