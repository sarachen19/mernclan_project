
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import Home from './Home';
import Note from './Note';
import Journal from './Journal';
import Resume from './Resume';
import NotFound from './notFound';
import Task from './Task';
import '../App.css';
import JobApplication from './JobApplication';
import Login from './Login';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Header />
      <body>
        <Container>
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/task" component={Task}></Route>
            <Route path="/note" component={Note}></Route>
            <Route path="/journal" component={Journal}></Route>
            <Route path="/resume" component={Resume}></Route>
            <Route path="/job-application" component={JobApplication}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/Login" component={Login}></Route>
            <Redirect from="/" to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </Container>
      </body>
      <Footer />
    </React.Fragment>
  );
}

export default App;
