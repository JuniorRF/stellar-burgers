import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouterProps = {
  children: React.ReactNode;
  isPublic?: boolean;
};

export function ProtectedRouter({ children, isPublic }: ProtectedRouterProps) {
  const location = useLocation();
  const refreshToken = localStorage.getItem('refreshToken');
  if (isPublic && refreshToken) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!isPublic && !refreshToken) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  return children;
}
