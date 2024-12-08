export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
  return !!token; // Returns true if the token exists
};
