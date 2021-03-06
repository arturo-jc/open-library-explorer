import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Subject from "./pages/Subject";
import Book from "./pages/Book";
import Error from "./pages/Error";
import NotFound from "./components/NotFound";
import styles from './App.module.css';

const App = () => {

  return (
    <Fragment>
      <div className={styles['site-content']}>
        <Navbar />
        <main className={styles.padded}>
          <ErrorBoundary>
            <Switch>
              <Route path='/' exact>
                <Main />
              </Route>
              <Route path='/subjects/:subject/:page'>
                <Subject />
              </Route>
              <Route path='/books'>
                <Book />
              </Route>
              <Route path='/error'>
                <Error />
              </Route>
              <Route path='/'>
                <NotFound
                  message="Could not find the requested resource. Sorry!"
                />
              </Route>
            </Switch>
          </ErrorBoundary>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
