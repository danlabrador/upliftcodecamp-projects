import GoogleSSO from '@/services/api/GoogleSSO';
import { AppDispatch } from '@/services/state/store';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from './useLocalStorage';

export function useGoogleSSO() {
  const dispatch = useDispatch<AppDispatch>();
  const { setItem: setIsLoggedIn } = useLocalStorage('isLoggedIn');

  const googleSSO = useMemo(() => new GoogleSSO(), []);

  useEffect(() => {
    googleSSO.renderButton(dispatch, setIsLoggedIn);
  }, [googleSSO, dispatch, setIsLoggedIn]);

  const logout = () => {
    googleSSO.logout();
  };

  return { logout };
}
