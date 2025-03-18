import React from 'react';
import { useField } from '../hooks/useField';

export const  LoginForm = () => {
  const email = useField('email');
  const password = useField('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email.value, password.value);
  }

  return (
    <form onSubmit={handleSubmit} style={{'display': 'flex', 'flexDirection': 'column'}}>
      <input
        type={email.type}
        value={email.value}
        onChange={email.onChange}
        placeholder="Email"
      />
      <input
        type={password.type}
        value={password.value}
        onChange={password.onChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}