/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
 
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      login(username, password);
      
      const storedUser = localStorage.getItem('token');
      if (storedUser) {
        const { role } = JSON.parse(storedUser);
        router.push(role === 'admin' ? '/dashboard' : '/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="mx-auto size-full">
      <form onSubmit={handleSubmit} className='size-full'>
        <div className="mx-auto w-full max-w-[460px] space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Enter your details</p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="rounded-none  border-0 border-b-2 bg-transparent p-1 text-base"
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="rounded-none border-0 border-b-2 bg-transparent p-1 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="size-4 text-muted-foreground" /> : <Eye className="size-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="h-12 w-full rounded-full text-white">Sign-in</Button>
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
