import GoogleSSO from '@/services/api/GoogleSSO';
import { AppDispatch } from '@/services/state/store';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from './useLocalStorage';

export function useGoogleSSO() {
  const dispatch = useDispatch<AppDispatch>();
  const { setItem: setIsLoggedIn } = useLocalStorage('isLoggedIn');
  const {setItem: setId } = useLocalStorage('id');
  const {setItem: setEmail } = useLocalStorage('email');
  const {setItem: setFamilyName } = useLocalStorage('familyName');
  const {setItem: setGivenName } = useLocalStorage('givenName');
  const {setItem: setPicture } = useLocalStorage('picture');

  const googleSSO = useMemo(() => new GoogleSSO(), []);

  useEffect(() => {
    googleSSO.renderButton(dispatch, setIsLoggedIn, setId, setEmail, setFamilyName, setGivenName, setPicture);
  }, [googleSSO, dispatch, setIsLoggedIn, setId, setEmail, setFamilyName, setGivenName, setPicture]);

  const logout = () => {
    googleSSO.logout();
  };

  return { logout };
}
