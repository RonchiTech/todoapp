import Main from './components/Main/Main';
import Auth from './auth/auth';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
const App = ({ isAuth }) => {

  console.log(isAuth);
  let route = (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
  if (isAuth) {
    route = (
      <Switch>
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return route
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken !== null,
  };
};
export default connect(mapStateToProps)(App);
