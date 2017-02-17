class CubeCaretaker {

    constructor(cube) {
        this.cube = cube;
        this.states = [];
        this.stateIndex = -1;
        this.saveState();
    }

    saveState() {
        this.states.push(this.cube.saveState());
        this.stateIndex++;
        console.log('state saved ' + this.stateIndex);
    }
    undo() {
        if (this.stateIndex != 0) {
            this.stateIndex--;
            this.cube.setState(this.states[this.stateIndex]);
        } else if (this.states.length == 1) {
            this.cube.setState(this.stateIndex);
        }
        console.log('undo ' + this.stateIndex);
    }
    redo() {
        if (this.stateIndex != this.states.length - 1) {
            this.stateIndex++;
            this.cube.setState(this.states[this.stateIndex]);
        }
        console.log('redo ' + this.stateIndex);
    }

}