import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { PageNotFound } from './pages/PageNotFound';
import { UserPage } from './pages/UserPage';

import { ToastComponent } from './components/ToastComponent';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <HelmetProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <ProtectedRoute authenticationPath='/' path="/rooms/new" component={NewRoom} />
              <ProtectedRoute authenticationPath='/' path="/user" component={UserPage} />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
              <Route path="*" component={PageNotFound}/>
            </Switch>
          </HelmetProvider>
        </AuthContextProvider>
      </BrowserRouter>
    <ToastComponent/>
    </>
  );
}

export default App;