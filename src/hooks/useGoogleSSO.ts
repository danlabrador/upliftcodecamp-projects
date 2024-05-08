import GoogleSSO from '@/services/api/GoogleSSO';
import { AppDispatch } from '@/services/state/store';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export function useGoogleSSO() {
  const dispatch = useDispatch<AppDispatch>();

  const googleSSO = useMemo(() => new GoogleSSO(), []);

  useEffect(() => {
    googleSSO.renderButton(dispatch);
  }, [googleSSO, dispatch]);

  const logout = () => {
    googleSSO.logout();
  };

  return { logout };
}
