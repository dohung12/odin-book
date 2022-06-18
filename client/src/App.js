import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Error,
  Landing,
  Login,
  Register,
  PrivateRouteLayout,
  PublicRouteLayout,
  ProtectedRoute,
  Password,
  Profile,
  Settings,
  OtherUsersProfile,
  SearchResult,
  SinglePostPage,
} from './pages/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <PrivateRouteLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/password' element={<Password />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/result' element={<SearchResult />}></Route>

          <Route path='/user'>
            <Route path=':userId' element={<OtherUsersProfile />}></Route>
          </Route>
          <Route path='/post'>
            <Route path=':postId' element={<SinglePostPage />}></Route>
          </Route>
        </Route>
        <Route element={<PublicRouteLayout />}>
          <Route path='/landing' element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
