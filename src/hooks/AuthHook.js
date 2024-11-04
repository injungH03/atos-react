import { useContext } from 'react';
import { AuthContext } from '@context';

const AuthHook = () => {
  const { auth, login, logout } = useContext(AuthContext);

  return { auth, login, logout };
};

export default AuthHook;
