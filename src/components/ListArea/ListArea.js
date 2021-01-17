import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import classes from './ListArea.module.css';
import Navigation from '../../Navigations/Navigation';

const ListAll = React.lazy(() => import('./ListAll'));
const ListDone = React.lazy(() => import('./ListDone'));
const ListArea = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={classes.ListArea}>
        <Navigation />
       
          <Route exact path="/" component={()=> <ListAll/>} />
          <Route  path="/done" component={ListDone} />
     
      </div>
      </Suspense>
  );
};

export default React.memo(ListArea);
