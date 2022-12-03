import {
    loadBranchSelected,
    loadDepSelected,
    saveBranchSelected,
    saveDepSelected,
    saveDeps,
    saveBranches,
    removeDepSelected,
    removeEmpSelected,
    saveEmpSelected,
    loadEmpSelected
} from "./modules/storage.js";

let branches;
let branch_selected = '';
$(document).ready(() => {
    console.log('start -> ok');

    removeEmpSelected();
    removeDepSelected();
    
    getBranches();
});

function getBranches() {
    $.post("services/core.php",
        {
            "action": "getBranches"
        }, displayBranches);
}

function displayBranches(data) {
    branches = JSON.parse(data);
    saveBranches(branches);
    let out = '';
    let b_selected = loadBranchSelected();
    if (b_selected === undefined)
        out += '<option>Select branch...</option>';
    for (let branch of branches) {
        out += '<option ';
        if (b_selected === branch) {
            out += 'selected ';
        }
        out += `value="${branch}">${branch}</option>`;
    }
    $('#branch-select').html(out);
    // $('#select_branch').on('submit', displayDeps);
    $('#branch-form').on('change', getDeps).trigger('change');
    out = '<p><strong>Філії:  </strong>'
    out += `<a href="sections/branches/branch-add.html?#">Додати</a>`;
    if (loadBranchSelected() !== undefined) {
        out += ` | <a href="sections/branches/branch-edit.html?#">Редагувати</a>`;
        out += ` | <a href="sections/branches/branch-delete.html?#">Видалити</a>`;
    }
    out += '</p>';
    $('#branch-crud').html(out);
}

function getDeps() {
    let b_name = '';
    $("select#branch-select option:selected").each(function () {
        b_name += $(this).val();
    });
    branch_selected = b_name;
    $('#branch-message').html('Дані по філіалу: ' + b_name);

    saveBranchSelected(b_name);
    removeDepSelected();
    displayDepMenu();
    removeEmpSelected();
    displayEmpMenu();

    $('#dep-message').html('Оберіть відділ ...');
    $('#emps-table').html('');
    $.post(
        "services/core.php",
        {
            "action": "getDeps",
            "b_name": b_name
        },
        displayDeps
    );
}

// const testEmps = (event) => {
//     console.log(event.target.innerText);
// }

function displayDeps(data) {
    let deps = JSON.parse(data);
    saveDeps(deps);
    if (deps !== -1) {
        let out = '';
        let n = 0;
        for (let dep of deps) {
            out +=
                `<tr id="${idEncode(dep.name)}" class="dep-pointed">` +
                `<th scope="row">${++n}</th>` +
                `<td>${dep.name}</td>` +
                `<td>${dep.employees.length}</td>` +
                '</tr>'
                ;
        }
        $('#deps-table').html(out);
        $('.dep-pointed').on('click', getEmps);
        removeDepSelected();
    }
}

function getEmps(event) {
    let b_name = branch_selected;
    let d_row_id = event.target.parentElement.id;
    let d_name = idDecode(d_row_id);
    $('#deps-table').children('.table-primary').removeClass('table-primary');
    $(`#${d_row_id}`).addClass('table-primary');

    saveDepSelected(d_name);
    displayDepMenu();
    removeEmpSelected();
    displayEmpMenu();

    $('#dep-message').html('Дані по відділу: ' + d_name);
    displayEmpMenu();
    $.post(
        "services/core.php",
        {
            "action": "getEmps",
            "b_name": b_name,
            "d_name": d_name
        },
        displayEmps
    );
}

function displayEmps(data) {
    let emps = JSON.parse(data);
    let out = '';
    let n = 0;
    for (let emp of emps) {
        out +=
            `<tr id="${idEncode(emp.name)}" class="emp-pointed">` +
            `<th scope="row">${++n}</th>` +
            `<td>${emp.name}</td>` +
            `<td>${emp.position}</td>` +
            `<td>${emp.salary}</td>` +
            `<td>${emp.phone}</td>` +
            '</tr>'
            ;
    }
    $('#emps-table').html(out);
    $('.emp-pointed').on('click', setEmpSelected);
    removeEmpSelected();
}

function setEmpSelected(event) {
    let e_row_id = event.target.parentElement.id;
    let e_name = idDecode(e_row_id);
    $('#emps-table').children('.table-primary').removeClass('table-primary');
    $(`#${e_row_id}`).addClass('table-primary');
    saveEmpSelected(e_name);
    displayEmpMenu();
}

function displayDepMenu() {
    let out = '';
    out += '<p><strong>Відділи:  </strong>';
    out += '<a href="sections/departments/dep-add.html?#">Додати</a>';
    if (loadDepSelected() !== undefined) {
        out += ' | <a href="sections/departments/dep-edit.html?#">Редагувати</a>';
        out += ' | <a href="sections/departments/dep-delete.html?#">Видалити</a>';
    }
    out += '</p>';
    $('#dep-crud').html(out);
}

function displayEmpMenu() {
    let out = '';
    out += '<p><strong>Співробітники:  </strong>';
    out += '<a href="sections/employees/emp-add.html?#">Додати</a>';
    if (loadEmpSelected() !== undefined) {
        out += ' | <a href="sections/employees/emp-edit.html?#">Редагувати</a>';
        out += ' | <a href="sections/employees/emp-delete.html?#">Видалити</a>';
    }
    out += '</p>';
    $('#emp-crud').html(out);
}

function idEncode(data) {
    return data.replaceAll(" ", "_")
}

function idDecode(data) {
    return data.replaceAll("_", " ")
}



