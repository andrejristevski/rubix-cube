class CubeCaretaker {

    constructor(cube) {
        this.cube = cube;
        this.states = [];
        this.stateIndex = -1;
        this.saveState();
    }

    saveState() {
        console.log('state saved ' + this.stateIndex);
        this.states.push(this.cube.saveState());
        this.stateIndex++;
    }
    undo() {
        console.log('undo ' + this.stateIndex);
        if (this.stateIndex != 0) {
            this.stateIndex--;
            this.cube.setState(this.states[this.stateIndex]);
        }
    }
    redo() {
        console.log('redo ' + this.stateIndex);
        if (this.stateIndex != this.states.length - 1) {
            this.stateIndex++;
            this.cube.setState(this.states[this.stateIndex]);
        }
    }

}