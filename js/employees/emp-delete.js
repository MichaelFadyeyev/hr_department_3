import { loadBranchSelected, loadDeps, loadDepSelected, loadEmpSelected, removeEmpSelected } from '../modules/storage.js';
import { findDep, findEmp } from '../modules/operations.js';

let deps = loadDeps();
let b_name = loadBranchSelected();
let d_name = loadDepSelected();
let e_name = loadEmpSelected();

$(document).ready(() => {
    console.log('edit-emp -> ok');
    $('#sub-header').text(`Філія: ${b_name}`);
    $('#dep-name').val(d_name);
    $("#emp-name").val(e_name);
    let dep = findDep(deps, d_name);
    let emp = findEmp(dep, e_name);
    console.log(emp);
    $("#position").val(emp.position);
    $("#salary").val(emp.salary);
    $("#phone").val(emp.phone);
    $('#emp-edit-form').one('submit', function () {
        $.post(
            "../../services/core.php",
            {
                "action": "deleteEmp",
                "b_name": b_name,
                "d_name": d_name,
                "e_name": e_name
            }, successResult
        );
    });
});

function successResult(data) {
    let out = ''
    if (data == 1) {
        removeEmpSelected();
        out += `</br><h5>Дані співробітника <strong>${e_name}</strong> успішно видалені</h5>`;
    } else
        out += `</br><h5>Помилка видалення даних співробітника</h5>`;
    $('#emp-edit').html(out);
}