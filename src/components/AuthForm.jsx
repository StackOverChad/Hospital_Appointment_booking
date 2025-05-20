import { useState } from 'react';
import { login, register } from '../services/auth';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authFunction = isLogin ? login : register;
      const response = await authFunction(email, password);
      localStorage.setItem('token', response.token);
      // Redirect to dashboard
    } catch (error) {
      console.error('Authentication Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form UI */}
    </form>
  );
};