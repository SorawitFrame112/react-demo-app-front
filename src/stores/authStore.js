import { create } from 'zustand';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export const useAuthStore = create((set) => ({
  user: null, 
  accessToken: null, 
  refreshToken: null,
  isAuthenticated: false, 
 
  login: (userData) => {
    localStorage.setItem('accessToken', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('user', JSON.stringify({
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      roles: userData.roles
    }));

    set({
      user: {
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        roles: userData.roles
      },
      accessToken: userData.token,
      refreshToken: userData.refreshToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userString = localStorage.getItem('user');

    if (accessToken && refreshToken && userString) {
      try {
        const user = JSON.parse(userString);
        set({
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
          isAuthenticated: true,
        });
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        // Clear corrupted data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({ isAuthenticated: false });
      }
    } else {
      set({ isAuthenticated: false });
    }
  },

  setTokens: (newAccessToken, newRefreshToken) => {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    set({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  },

  isAccessTokenExpired: () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return true;
    const decodedToken = parseJwt(accessToken);
    if (!decodedToken || !decodedToken.exp) return true; 
    const expiryTime = decodedToken.exp * 1000; 
    return Date.now() >= expiryTime;
  },

  hasRole: (role) => {
    const currentState = useAuthStore.getState(); 
    return currentState.user && currentState.user.roles && currentState.user.roles.includes(role);
  },
}));

useAuthStore.getState().initializeAuth();