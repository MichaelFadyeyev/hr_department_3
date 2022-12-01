export function saveBranchSelected(b_name) {
    localStorage.setItem('b_selected', b_name);
}

export function saveDepSelected(d_name){
    localStorage.setItem('d_selected', d_name);
}

export function saveDeps(deps){
    let depsJSON = JSON.stringify(deps);
    localStorage.setItem('deps', depsJSON);
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

export function loadBranchSelected() {
    let b_name = localStorage.getItem('b_selected');
    if (b_name) {
        return b_name;
    }
}

export function loadDeps() {
    let depsJSON = localStorage.getItem('deps');
    if (depsJSON) {
        return JSON.parse(depsJSON);
    }
}

export function loadDepSelected() {
    let d_name = localStorage.getItem('d_selected');
    if (d_name) {
        return d_name;
    }
}