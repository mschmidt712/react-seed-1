import 'font-awesome/css/font-awesome.css';
import './bootstrap.scss';

import * as React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, RouteComponentProps} from 'react-router-dom';

import Navigation from '../navigation/navigation';
import Footer from '../footer/footer';
import Home from '../../views/home/home';
import About from '../../views/about/about';

interface BootstrapStateInterface {
  contacts: ContactInterface[];
  currentIndex: number;
}

interface BootstrapPropsInterface extends RouteComponentProps<{}> {
}

interface ContactInterface {
  firstName: string;
  middleName?: string;
  email?: string;
  lastName?: string;
  phone?: string;
  id?: number;
}

export default class Bootstrap extends React.Component<BootstrapPropsInterface, BootstrapStateInterface> {
  constructor(props: BootstrapPropsInterface) {
    super(props);
    this.state = {
      contacts: [],
      currentIndex: 0
    };
  }

  private updateContacts(contacts: ContactInterface[], index: number): void {
    this.setState({
      contacts: contacts,
      currentIndex: index
    });
  }

  render() {
    return (
      <div className='container-fluid'>
        <section className='row'>
          <Navigation />
        </section>

        <section className='row main'>
          { this.props.children }
           {/*router moved in order to only manage state in one place*/}
          <Switch>
            <Route exact path={this.props.match.url} render={() => <Home
              contacts={this.state.contacts}
              currentIndex = {this.state.currentIndex}
              onListUpdate={this.updateContacts.bind(this)}/>}
            />

            <Route
              path={this.props.match.url + 'about'}
              component={About}
            />
          </Switch>
        </section>

        <section className='row'>
          <Footer />
        </section>
      </div>
    );
  }

}