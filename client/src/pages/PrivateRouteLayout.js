import { Outlet } from 'react-router-dom';
import { PrivNavBar, Sidebar, SmallSidebar } from '../components/index';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin-bottom: 0;
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .dashboard-page > :first-child {
    background-color: #fff;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }

  .dashboard > div {
    background-color: #eff3f6;
  }
`;

const PrivateRouteLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <Sidebar />
        <SmallSidebar />
        <div>
          <PrivNavBar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default PrivateRouteLayout;
