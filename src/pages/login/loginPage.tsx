import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router } from '@/router';
import { SyntheticEvent, useState } from 'react';
import LoadingIcons from 'react-loading-icons';

function LoginPage() {
  // Define state variables for username, password, and success
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);

  // Event handler for username input change
  const handleUsernameChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setUsername(target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPassword(target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // Do something with the username and password, like submitting to a server
    if (username === 'user@example.com' && password === 'password123') {
      setSuccess(true);
      setTimeout(() => router.navigate('/'), 2000);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="user@example.com"
          value={username}
          onChange={handleUsernameChange}
          className="bg-white mb-3"
        />
        <Input
          type="password"
          placeholder="password123"
          value={password}
          onChange={handlePasswordChange}
          className="bg-white mb-3"
        />
        {success === null ? null : success ? (
          <div>
            <p
              className={
                success === null
                  ? 'text-blue-500 mb-2'
                  : success
                    ? 'text-green-500 mb-2'
                    : 'text-red-500 mb-2'
              }
            >
              Erfolgreich!
            </p>
            <div className="flex justify-center mb-2">
              <LoadingIcons.TailSpin />
            </div>
          </div>
        ) : (
          <p
            className={
              success === null
                ? 'text-blue-500'
                : success
                  ? 'text-green-500'
                  : 'text-red-500'
            }
          >
            Benutzername oder Passwort falsch
          </p>
        )}
        <Button
          type="submit"
          className={
            success === null
              ? 'bg-blue-500'
              : success
                ? 'bg-green-500'
                : 'bg-red-500'
          }
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
