import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  registerUser,
  logout as logoutAction,
  updateUserProfile,
  refreshUserData,
  setError as setErrorAction,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: resultAction.payload };
    }
  };

  const register = async (firstName, lastName, email, password) => {
    const resultAction = await dispatch(
      registerUser({ firstName, lastName, email, password })
    );
    if (registerUser.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: resultAction.payload };
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const updateProfile = async (profileData) => {
    const resultAction = await dispatch(updateUserProfile(profileData));
    if (updateUserProfile.fulfilled.match(resultAction)) {
      return { success: true, message: resultAction.payload.message };
    } else {
      return { success: false, error: resultAction.payload };
    }
  };

  const refreshUser = async () => {
    const resultAction = await dispatch(refreshUserData());
    if (refreshUserData.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
  };

  const setError = (msg) => {
    dispatch(setErrorAction(msg));
  };

  return {
    user,
    token,
    loading,
    error,
    setError,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    isAuthenticated: !!token && !!user,
  };
};

export default useAuth;
