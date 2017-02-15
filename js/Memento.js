class Memento {

    constructor(cubicls) {
        this.state = this.getStateFromCubicls(cubicls);
        let breakpoint = 0;
    }

    getState() {
        return this.state;
    }


    getStateFromCubicls(cubicls) {
        let res = [];

        cubicls.forEach((cubix) => {
            let cubixMemento = this.cloneCubix(cubix);
            res.push(cubixMemento);
        });
        return res;
    }

    cloneCubix(original) {

        let {ci, cj, ck, si, sj, sk, position, rotation, prevPosition} = original;

        var posVec = new BABYLON.Vector3(getRounded(position.x), getRounded(position.y), getRounded(position.z));

        position = posVec.clone();
        rotation = rotation.clone();
        prevPosition = prevPosition.clone();

        let res = {
            ci: ci,
            cj: cj,
            ck: ck,
            si: si,
            sj: sj,
            sk: sk,
            position: position,
            rotation: rotation,
            prevPosition: prevPosition
        };

        return res;

    }
}