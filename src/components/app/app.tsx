import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRouter
} from '@components';
import { useEffect } from 'react';
import { useAppDispatch } from '@app-store';
import { FeedsThunk, getUser, IngredientsThunk } from '@slices';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    dispatch(IngredientsThunk());
    dispatch(FeedsThunk());
  }, []);

  const handleOnClose = (): void => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          }
        />
        <Route path='/profile/orders' element={<ProfileOrders />} />
      </Routes>
      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Ингридиент'} onClose={handleOnClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title={'Заказ'} onClose={handleOnClose}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
