import {loadBranches, loadBranchSelected, loadDeps, loadDepSelected, saveDepSelected} from './modules/storage.js';

let branches = loadBranches();
let deps = loadDeps();
let b_name = loadBranchSelected();
let d_name = loadDepSelected();
let new_d_name = '';


$(document).ready(() => {
    console.log('edit-dep -> ok');
    console.log(d_name);
    displaySelect();
    $("#dep-name").val(d_name);
    $('#dep-edit-form').one('submit', function () {
        $("select#branch-select option:selected").each(function () {
            b_name = $(this).val();
        });
        new_d_name = $("#dep-name").val();
        if (new_d_name !== '') {
            console.log(`${b_name} | ${d_name} | ${new_d_name}`)
            $.post(
                "services/core.php",
                {
                    "action": "editDep",
                    "b_name": b_name,
                    "d_name": d_name,
                    "new_d_name": new_d_name
                }, successResult
            );
        }
    });
});

function successResult(data) {
    let out = ''
    console.log(data);
    if (data == 1){
        saveDepSelected(new_d_name);
        out += `</br><h5>Дані відділу успішно змінені</strong></h5>`;
    }
    else
        out += `</br><h5>Помилка редагування даних</h5>`;
    $('#dep-edit').html(out);
}

function decodeData() {
    // return decodeURIComponent(window.location.href.split('?')[1]).split(',');
    return decodeURIComponent(window.location.hash.substring(1)).split(',');
}

function displaySelect() {
    let out = '';
    for (let branch of branches) {
        out += `<option value="${branch}" `;
        if (branch === b_name) {
            out += 'selected ';
        }
        out += `>${branch}</option>`;
    }
    $('#branch-select').html(out);
}
