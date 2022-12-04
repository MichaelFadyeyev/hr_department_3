import { loadBranchSelected, loadDeps, loadDepSelected, loadEmpSelected, saveDepSelected, saveEmpSelected } from '../modules/storage.js';
import { findDep, findEmp, displaySelect, displayPosSelect } from '../modules/operations.js';

let deps = loadDeps();
let b_name = loadBranchSelected();
let d_name = loadDepSelected();
let e_name = loadEmpSelected();
let position = '';
let salary = '';
let phone = '';
let new_d_name = '';
let new_e_name = '';

$(document).ready(() => {
    console.log('edit-emp -> ok');
    $('#sub-header').text(`Філія: ${b_name}`);
    displaySelect(deps, d_name);
    $("#emp-name").val(e_name);
    let dep = findDep(deps, d_name);
    let emp = findEmp(dep, e_name);
    $("#salary").val(emp.salary);
    $("#phone").val(emp.phone);
    $('#dep-select').on('change', function () {
        $('select#dep-select option:selected').each(function () {
            let selected_d = findDep(deps, $(this).val());
            saveDepSelected(selected_d.name);
            displayPosSelect(selected_d);
        });
    });
    $('#emp-edit-form').one('submit', function () {
        $('select#dep-select option:selected').each(function () {
            new_d_name = $(this).val();
        });
        $('select#position option:selected').each(function () {
            position = $(this).val();
        });

        new_e_name = $('#emp-name').val();
        salary = $('#salary').val();
        phone = $('#phone').val();

        if (e_name !== '' && salary !== '' && phone !== '') {
            console.log(e_name);
            $.post(
                "../../services/core.php",
                {
                    "action": "editEmp",
                    "b_name": b_name,
                    "d_name": d_name,
                    "new_d_name": new_d_name,
                    "e_name": e_name,
                    "new_e_name": new_e_name,
                    "position": position,
                    "salary": salary,
                    "phone": phone
                }, successResult
            );
        }
        else alert('Внесіть дані в усі поля!')
    });
});

function successResult(data) {
    let out = ''
    if (data == 1) {
        saveDepSelected(d_name);
        saveEmpSelected(e_name);
        out += `</br><h5>Дані співробітника <strong>${e_name}</strong> успішно змінені</h5>`;
    } else
        out += `</br><h5>Помилка редагування даних співробітника</h5>`;
    $('#emp-edit').html(out);
}