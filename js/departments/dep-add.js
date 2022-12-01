import {loadBranches, loadBranchSelected, saveDepSelected} from '../modules/storage.js';

let branches;
let b_name = '';
let d_name = '';


$(document).ready(() => {
    console.log('add-dep -> ok');
    branches = loadBranches();
    displaySelect();
    $('#dep-add-form').one('submit', function () {
        $("select#branch-select option:selected").each(function () {
            b_name += $(this).val();
        });
        d_name = $("#dep-name").val();
        if (d_name !== '') {
            $.post(
                "../../services/core.php",
                {
                    "action": "addDep",
                    "b_name": b_name,
                    "d_name": d_name
                }, successResult
            );
        }
    });
});

function successResult(data) {
    let out = ''
    if (data == 1) {
        saveDepSelected(d_name);
        out += `</br><h5>Відділ <strong>${d_name}</strong> успішно доданий до філії <strong>${b_name}</strong></h5>`;
    } else
        out += `</br><h5>Помилка додавання нового відділу</h5>`;
    $('#dep-add').html(out);
}

function decodeData() {
    // return decodeURIComponent(window.location.href.split('?')[1]).split(',');
    return decodeURIComponent(window.location.hash.substring(1)).split(',');
}

function displaySelect() {
    let out = '<option selected>Оберіть філію ...' +
        '</option>';
    let selected_b_name = loadBranchSelected();
    for (let branch of branches) {
        out += `<option value="${branch}"`;
        if(branch === selected_b_name)
            out += " selected";
        out += `>${branch}</option>`
    }
    $('#branch-select').html(out);
}
