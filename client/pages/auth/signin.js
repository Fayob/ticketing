import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors }  = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  })

  const onSubmit = async (e) => {
    e.preventDefault();

    doRequest()
  }

  return (
    <form className="container">
      <h1>Sign In</h1>
      <div className="form-group my-2">
        <label>Email Address</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="form-control" 
        />
      </div>
      <div className="form-group my-2">
        <label>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control" 
        />
      </div>
      {errors}
      <button onClick={onSubmit} className="btn btn-primary my-2">Sign In</button>
    </form> 
  );
};