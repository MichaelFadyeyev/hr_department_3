import { loadBranchSelected, loadDeps, loadDepSelected, saveDepSelected, saveEmpSelected } from '../modules/storage.js';
import { findDep, displaySelect, displayPosSelect } from '../modules/operations.js';

let deps = loadDeps();
let b_name = loadBranchSelected();
let d_name = loadDepSelected();
let e_name = '';
let position = '';
let salary = '';
let phone = '';

$(document).ready(() => {
    console.log('edit-emp -> ok');
    $('#sub-header').text(`Філія: ${b_name}`);
    displaySelect(deps, d_name);
    $('#dep-select').one('change', function () {
        $('select#dep-select').children('#default-option').remove();
        $('#dep-select').change();
    });
    $('#dep-select').on('change', function () {
        $('select#dep-select option:selected').each(function () {
            let selected_d = findDep(deps, $(this).val());
            saveDepSelected(selected_d.name);
            displayPosSelect(selected_d);
        });
    });
    $('#emp-add-form').one('submit', function () {
        $('select#dep-select option:selected').each(function () {
            d_name = $(this).val();
        });
        $('select#position option:selected').each(function () {
            position = $(this).val();
        });

        e_name = $('#emp-name').val();
        salary = $('#salary').val();
        phone = $('#phone').val();

        if (e_name !== '' && salary !== '' && phone !== '') {
            console.log(e_name);
            $.post(
                "../../services/core.php",
                {
                    "action": "addEmp",
                    "b_name": b_name,
                    "d_name": d_name,
                    "e_name": e_name,
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
        out += `</br><h5>Співробітник <strong>${e_name}</strong> успішно доданий</h5>`;
    } else
        out += `</br><h5>Помилка додавання нового співробітника</h5>`;
    $('#emp-add').html(out);
}