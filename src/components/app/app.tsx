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
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useAppDispatch } from '@app-store';
import { FeedsThunk, IngredientsThunk } from '@slices';

const App = () => {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(IngredientsThunk());
    dispatch(FeedsThunk());
  }, []);

  const handleOnClose = (): void => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингредиента'} onClose={handleOnClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};
export default App;

{
  /* <Route path='/feed' element={<Feed />}>
          <Route path='/:number' element={<OrderInfo />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} /> */
}
