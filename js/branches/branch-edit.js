import {loadBranchSelected, saveBranchSelected, saveDepSelected} from '../modules/storage.js';

let b_name = '';
let old_b_name = loadBranchSelected();


$(document).ready(() => {
    console.log('edit-branch -> ok');
    $("#branch-name").val(old_b_name);
    $('#branch-edit-form').on('submit', () => {
        b_name = $("#branch-name").val();
        if (b_name !== '') {
            $.post(
                "../../services/core.php",
                {
                    "action": "editBranch",
                    "old_b_name": old_b_name,
                    "b_name": b_name,
                }, successResult
            );
        }
    });
});

function successResult(data) {
    let out = ''
    if (data == 1) {
        saveBranchSelected(b_name);
        out += `</br><h5>Філія <strong>${b_name}</strong> успішно оновлена</strong></h5>`;
    } else
        out += `</br><h5>Помилка редагування філії</h5>`;
    $('#branch-edit-form').html(out);
}