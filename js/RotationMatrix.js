class RotationMatrix {

    constructor() {
    }

    static getRotationMatrix() {

        let rotX = [[1, 0, 0], [0, 0, -1], [0, 1, 0]];
        let rotY = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]];
        let rotZ = [[0, -1, 0], [1, 0, 0], [0, 0, 1]];

        let negativeRotX = [[1, 0, 0], [0, 0, 1], [0, -1, 0]];
        let negativeRotY = [[0, 0, -1], [0, 1, 0], [1, 0, 0]];
        let negativeRotZ = [[0, 1, 0], [-1, 0, 0], [0, 0, 1]];


    }

}