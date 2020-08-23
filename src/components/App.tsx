import * as React from 'react';
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button } from 'antd';
import { testStoreName, Test} from '../stores/testStore';
import { testStore } from "../stores/index"
import { useContext } from 'react';

interface AppProps {
    testStore: Test
}

@inject(testStoreName)
@withRouter
@observer
export default class App extends React.Component { 
    get testStore(): Test {        
        return (this.props as AppProps).testStore;
      }
    constructor(props) {
        super(props);
        this.testStore.startWith(300);
    }

    componentDidMount () {
        setInterval(() => {
            this.testStore.incrementTimer()
        }, 1000);
    }

    render() {
        const timer = this.testStore.timer;
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {timer}
                </button>
                <Button onClick={this.onReset}>
                    Seconds passed antd: {timer}
                </Button>
            </div>
        );
     }

     onReset = () => {
        this.testStore.resetTimer();
     }
};