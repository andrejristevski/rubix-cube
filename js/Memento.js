class Memento {

    constructor(cubicls) {
        this.state = this.getStateFromCubicls(cubicls);
        let breakpoint=0; 	
    }

    getState() {
        return this.state;
    }


    getStateFromCubicls(cubicls) {
        let res = [];

        cubicls.forEach((el) => {
            let cubixMemento = this.cloneCubix(el);
            res.push(cubixMemento);
        });
        return res;
    }

    cloneCubix(original) {

        let {ci, cj, ck, si, sj, sk, position, rotation} = original;

        position = position.clone();
        rotation = rotation.clone();

        let res = { ci: ci, cj: cj, ck: ck, si: si, sj: sj, sk: sk, position: position, rotation: rotation };

        return res;

    }
}