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
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader, OrderInfo } from '@components';

const App = () => (
  // const location = useLocation();
  // console.log(location);
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </div>
  </BrowserRouter>
);
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
