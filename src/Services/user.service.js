
class UserService {

    getUserDetail= () =>{
        if (localStorage.hasOwnProperty('users') && localStorage.hasOwnProperty('user') ) {
            const users = JSON.parse(localStorage.getItem('users')); 
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            try {
                let filteredUser = users.filter(user => {
                    return user.userId === loggedInUser.userId && user.username=== loggedInUser.username;                  
               });
               return  filteredUser[0];
              } catch (e) {
                // handle empty string
                return null;
              } 
        }    
       
    }
}

export default UserService; 