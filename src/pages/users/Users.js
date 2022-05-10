import React, {useEffect, useState} from 'react'
import axios from 'axios';

const BASE_URL = "https://3001-henryheyhey-espressoexp-1blfs1n110r.ws-us44.gitpod.io/"

export default function Users() {

    const [userInfo, setUser] = useState({
        email: "",
        password: ""
    })
    const [response, setResponse] = useState(null);
    
    const onUpdateFormField = (e) => setUser({
        ...userInfo,
        [e.target.name]: e.target.value
    })


    useEffect(() => {}, [response])

    const login = async () => {
        console.log("works")
        let data = {
            "email": userInfo.email,
            "password": userInfo.password
        }
        let result = await axios.post(BASE_URL+"api/users/login", data);
        console.log(result);
        setResponse(result);
    }


    return (
        <React.Fragment>
            <h1>Users Login page</h1>
            <form className='m-5'>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            name="email"
                            value={userInfo.email}
                            onChange={onUpdateFormField}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" 
                            class="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password" 
                            name="password" 
                            value={userInfo.password}
                            onChange={onUpdateFormField}/>
                </div>
                <div className="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button onClick={login} 
                        class="btn btn-primary">Submit</button>
            </form>
        </React.Fragment>

    )
}