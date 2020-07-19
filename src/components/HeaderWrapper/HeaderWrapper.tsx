import React from 'react';
import stylesPage from '../../scss/Page.module.scss';
import Header from '../Header/Header';

function HeaderWrapper(props: {component: React.ReactNode | null}) {
  const { component } = props;
  return (
    <div className={stylesPage.wrapper}>
      <div className={stylesPage.container}>
        <Header />
        {component}
      </div>
    </div>
  );
}

export default HeaderWrapper;
