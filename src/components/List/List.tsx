import * as React from 'react';
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button } from 'antd';
import { testStoreName, Test} from '../../stores/testStore';
import { MenuStoreModel, LIST, menuStoreName } from '../../stores/menuStore';

interface ListProps {
    testStore?: Test
    menuStore?: MenuStoreModel
}

@inject(testStoreName, menuStoreName)
@observer
export class ListComponent extends React.Component<ListProps> { 
    get testStore(): Test {        
        return this.props.testStore;
    }
      
    get menuStore(): MenuStoreModel {        
        return this.props.menuStore;
    }

    constructor(props) {
        super(props);
        this.testStore.startWith(100);
        this.menuStore.selectMenu(LIST);
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

export default withRouter(ListComponent);