import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavBar from '../components/PublicNavBar';

const PublicRouteLayout = () => {
  return (
    <>
      <PublicNavBar />
      <Outlet />
    </>
  );
};

export default PublicRouteLayout;
