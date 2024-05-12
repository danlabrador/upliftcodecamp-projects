import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../services/state/user/userSlice';
import { useLocalStorage } from './useLocalStorage';
import { RootState, AppDispatch } from '../services/state/store';

export const useLoadUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getItem: getIsLoggedInFromLS } = useLocalStorage('isLoggedIn');
  const { getItem: getIdFromLS } = useLocalStorage('id');
  const { getItem: getEmailFromLS } = useLocalStorage('email');
  const { getItem: getFamilyNameFromLS } = useLocalStorage('familyName');
  const { getItem: getGivenNameFromLS } = useLocalStorage('givenName');
  const { getItem: getPictureFromLS } = useLocalStorage('picture');
  const isLoggedIn = getIsLoggedInFromLS();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn === 'true') {
      dispatch(
        setUser({
          id: parseInt(getIdFromLS()),
          email: getEmailFromLS(),
          familyName: getFamilyNameFromLS(),
          givenName: getGivenNameFromLS(),
          picture: getPictureFromLS(),
        })
      );
    }
    setIsLoading(false);
  }, [dispatch, isLoggedIn]);

  const user = useSelector((state: RootState) => state.user);

  return { user, isLoading };
};