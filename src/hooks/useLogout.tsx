import { useDispatch } from 'react-redux';
import { clearUser } from '@/services/state/user/userSlice';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const useLogout = () => {
  const { setItem: setIsLoggedIn } = useLocalStorage('isLoggedIn');
  const { removeItem: removeId } = useLocalStorage('id');
  const { removeItem: removeGivenName } = useLocalStorage('givenName');
  const { removeItem: removeFamilyName } = useLocalStorage('familyName');
  const { removeItem: removeEmail } = useLocalStorage('email');
  const { removeItem: removePicture } = useLocalStorage('picture');

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    setIsLoggedIn('false');
    removeId();
    removeGivenName();
    removeFamilyName();
    removeEmail();
    removePicture();
  };

  return { handleLogout };
};
