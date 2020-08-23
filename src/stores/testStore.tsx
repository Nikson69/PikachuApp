import { observable, action } from 'mobx';

export interface Test {
    timer: number;
    startWith(value: number): void;
    incrementTimer(): void;
    resetTimer(): void;
}

class TestStore {
    @observable timer = 555;

    @action
    startWith(value: number) {
        this.timer = value;
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