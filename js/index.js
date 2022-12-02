import {
    loadBranchSelected,
    saveBranchSelected,
    saveDepSelected,
    saveBranches, loadDepSelected, saveDeps
} from "./modules/storage.js";

let branches;
let branch_selected = '';
//let dep_selected = '';
$(document).ready(() => {
    console.log('start -> ok');
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
    console.log(branches);
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
    out =`<a href="sections/branches/branch-add.html?#">Додати філію</a>`;
    out += ` | <a href="sections/branches/branch-edit.html?#">Редагувати філію</a>`;
    out += ` | <a href="#">Видалити філію</a>`;
    $('#branch-crud').html(out);
}

function getDeps() {
    let b_name = '';
    $("select#branch-select option:selected").each(function () {
        b_name += $(this).val();
    });
    branch_selected = b_name;
    saveBranchSelected(b_name);
    $('#branch-message').html('Дані по філіалу: ' + b_name);
    $('#dep-add').html(`<a href="sections/departments/dep-add.html?#">Додати відділ</a>`);
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
                '<tr id="' + dep.name.replaceAll(" ", "_") + '" class="dep-pointed"> ' +
                `<th scope="row">${++n}</th>` +
                `<td>${dep.name}</td>` +
                `<td>${dep.employees.length}</td>` +
                `<td><a href="sections/departments/dep-edit.html?#">Edit</a> | `+
                `<a href="sections/departments/dep-delete.html?#">Delete</a></td>` +
                '</tr>'
            ;
        }
        $('#deps-table').html(out);
        $('.dep-pointed').on('click', getEmps);
        $('a').on('click', (event) => { event.stopPropagation();});
    }
}

function getEmps(event) {
    let b_name = branch_selected;
    let d_name = event.target.parentElement.id.replaceAll("_", " ");
    saveDepSelected(d_name);
    $('#dep-message').html('Дані по відділу: ' + d_name);
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

function displayEmps (data){
    let emps = JSON.parse(data);
    let out = '';
    let n = 0;
    for (let emp of emps) {
        out +=
            '<tr> ' +
            `<th scope="row">${++n}</th>` +
            `<td class="emp-pointed">${emp.name}</td>` +
            `<td>${emp.position}</td>` +
            `<td>${emp.salary}</td>` +
            `<td>${emp.phone}</td>` +
            `<td><a href="#">Edit</a> | <a href="#">Delete</a></td>` +
            '</tr>'
        ;
    }
    $('#emps-table').html(out);
}



