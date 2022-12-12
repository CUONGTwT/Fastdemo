import {useState , useEffect} from 'react'
import {auth} from '../../src/firebase/config'
import {onAuthStateChanged} from 'firebase/auth'
const useAuth = () => {
    const [currentUser,setCurrentUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    });
    return {
        currentUser, setCurrentUser
    }
}

export default useAuth;
