export const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Add any other cleanup needed
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};
