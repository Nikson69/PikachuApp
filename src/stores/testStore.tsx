import { observable, action, runInAction } from 'mobx';
import { TestReq, requests } from '../common/fetch';

export interface Test {
    timer: number;
    isLoading: boolean;
    data: any;
    startWith(value: number): void;
    incrementTimer(): void;
    resetTimer(): void;
    loadTypes(): any;
}

class TestStore {
    @observable timer = 555;
    @observable isLoading = true;
    @observable data;

    @action
    startWith(value: number) {
        this.timer = value;
    }

    @action
    loadTypes = async () => {
        this.isLoading = true;
        await TestReq.getTypes()
            .then(action(n => {
                this.data = n
            }))
            .finally(action(() => {
                this.isLoading = false;
            }));
    }

    @action
    incrementTimer() {
        this.timer += 1;
    }

    @action
    resetTimer() {
        this.timer = 0;
    }
}

export const testStoreName = "testStore";
export default new TestStore();