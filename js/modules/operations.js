export function findDep(deps, d_name) {
    for (let dep of deps) {
        if (dep.name === d_name) return dep;
    }
}

export function findEmp(dep, e_name) {
    let emps = dep.employees;
    for (let emp of emps) {
        if (emp.name === e_name) return emp;
    }
}

export function displaySelect(deps, d_name) {
    let out = '';
    if (d_name === undefined) {
        out += '<option selected id="default-option">Оберіть відділ ...</option>';
        displayPosSelect();
    }
    for (let dep of deps) {
        out += `<option value="${dep.name}" `;
        if (dep.name === d_name) {
            out += 'selected ';
            displayPosSelect(dep);
        }
        out += `>${dep.name}</option>`;
    }
    $('#dep-select').html(out);
}

export function displayPosSelect(d_selected) {
    let out = '';
    if (d_selected === undefined) {
        out += '<option selected>Відділ не обраний ...</option>';
    }
    else {
        let positions = '';
        for (let i = 0; i < d_selected.positions.length; i++) {
            positions = d_selected.positions[i];
            out += `<option value="${positions}">${positions}</option>`;
        }
    }
    $('#position').html(out);
}