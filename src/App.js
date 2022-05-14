import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Subject from "./pages/Subject";
import Book from "./pages/Book";
import styles from './App.module.css';

const App = () => {

  return (
    <Fragment>
      <div className={styles['site-content']}>
        <Navbar />
        <main className={styles.padded}>
          <Switch>
            <Route path='/' exact>
              <Main />
            </Route>
            <Route path='/subjects/:subject'>
              <Subject />
            </Route>
            <Route path='/books/:OLID'>
              <Book />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer/>
    </Fragment>
  );
}

export default App;
