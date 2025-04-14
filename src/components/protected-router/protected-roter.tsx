import { useAppSelector } from '@app-store';
import { getChekUser, getName } from '@slices';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouterProps = {
  children: React.ReactNode;
  isPublic?: boolean;
};

export function ProtectedRouter({ children, isPublic }: ProtectedRouterProps) {
  const location = useLocation();
  const user = useAppSelector(getName);
  const userCheck = useAppSelector(getChekUser);

  if (!userCheck) {
    <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
}
