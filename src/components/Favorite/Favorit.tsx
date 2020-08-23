import * as React from 'react';
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button } from 'antd';
import { testStoreName, Test} from '../../stores/testStore';
import { MenuStoreModel, FAVORITE, menuStoreName } from '../../stores/menuStore';

interface FavoriteProps {
    testStore?: Test
    menuStore?: MenuStoreModel
}

@inject(testStoreName, menuStoreName)
@observer
export class FavoriteComponent extends React.Component<FavoriteProps> { 
    get testStore(): Test {        
        return this.props.testStore;
    }
    get menuStore(): MenuStoreModel {        
        return this.props.menuStore;
    }
    constructor(props) {
        super(props);
        this.testStore.startWith(1000);
        this.menuStore.selectMenu(FAVORITE);
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

export default withRouter(FavoriteComponent);