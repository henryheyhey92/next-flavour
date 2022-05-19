import React, {useState, useEffect, useContext} from 'react'
import UsersContext from '../../contexts/UsersContext';

export default function Profile() {
    const [userProfile, setUserProfile] = useState({});
    const accessToken = localStorage.getItem('accessToken');
    let context = useContext(UsersContext);

    useEffect(()=> {
        const fetchProfile = async () => {
            console.log("Use effect for profile works");
            let response = await context.profile();
            setUserProfile(response);
            console.log(response);
        }
        fetchProfile();

    }, [accessToken, context.loginStatus()])


    return (
        <React.Fragment>
            <h1>Profile page</h1>
            <ul>
                <li>Id: {userProfile.first_name}</li>
            </ul>
        </React.Fragment>

    )
}