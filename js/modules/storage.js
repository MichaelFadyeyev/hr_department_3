/// branches /////////////////
export function saveBranchSelected(b_name) {
    localStorage.setItem('b_selected', b_name);
}
export function loadBranchSelected() {
    let b_name = localStorage.getItem('b_selected');
    if (b_name) {
        return b_name;
    }
}

export function saveBranches(branches){
    let branchesJSON = JSON.stringify(branches);
    localStorage.setItem('branches', branchesJSON);
}

export function loadBranches() {
    let branchesJSON = localStorage.getItem('branches');
    if (branchesJSON) {
        return JSON.parse(branchesJSON);
    }
}

export function removeBranchSelected(){
    localStorage.removeItem('b_selected');
}

/// departments //////////////
export function saveDepSelected(d_name){
    localStorage.setItem('d_selected', d_name);
}

export function loadDepSelected() {
    let d_name = localStorage.getItem('d_selected');
    if (d_name) {
        return d_name;
    }
}

export function saveDeps(deps){
    let depsJSON = JSON.stringify(deps);
    localStorage.setItem('deps', depsJSON);
}

export function loadDeps() {
    let depsJSON = localStorage.getItem('deps');
    if (depsJSON) {
        return JSON.parse(depsJSON);
    }
}

export function removeDepSelected(){
    localStorage.removeItem('d_selected');
}

/// employees/////////////////
export function saveEmpSelected(e_name){
    localStorage.setItem('e_selected', e_name);
}

export function loadEmpSelected() {
    let e_name = localStorage.getItem('e_selected');
    if (e_name) {
        return e_name;
    }
}

export function saveEmps(emps){
    let empsJSON = JSON.stringify(emps);
    localStorage.setItem('emps', empsJSON);
}

export function loadEmps() {
    let empsJSON = localStorage.getItem('emps');
    if (empsJSON) {
        return JSON.parse(empsJSON);
    }
}

export function removeEmpSelected(){
    localStorage.removeItem('e_selected');
}









