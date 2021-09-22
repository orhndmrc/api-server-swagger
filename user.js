export const getUserList = () =>  {
  return [
        {
            id: 1,
            isPublic: true,
            name: 'user1',
            companies: ['comp1', 'comp2', 'comp3'],
            books: [{
                name: 'book1',
                amount: 1,
            },
            {
                name: 'book2',
                amount: 200,
             }
        ]
     }, 
    {
            id: 2,
            isPublic: true,
            name: 'kk',
            companies: ['comp1', 'comp2', 'comp3'],
            books: [
                {
                    name: 'kk2',
                    amount: 1,
                },
                {
                    name: 'kk2',
                    amount: 200,
                }
           ]
      }
   ]
}


export const findUserById = (id) =>{
const users = getUserList()
   const userFound = users.filter((user) => {
        if (user.id === id) {
             return user
        }   
    });
   if(userFound.length>0){
        return userFound
    }
    return false

}