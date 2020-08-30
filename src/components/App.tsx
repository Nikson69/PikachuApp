import * as React from 'react';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import MenuComponent from './Menu/Menu';
import { ListComponent } from './List/List';
import { CardComponent } from './Card/Card';
import { FavoriteComponent } from './Favorite/Favorit';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <MenuComponent/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/card" /> 
                    </Route>
                    <Route path="/list" component={ListComponent} />
                    <Route path="/card" component={CardComponent} />
                    <Route path="/favorite" component={FavoriteComponent} />
                    <Route component={ListComponent} />
                </Switch>
            </React.Fragment>
        );
     }
};

export default withRouter(App);