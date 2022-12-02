import {loadBranchSelected, removeBranchSelected, saveBranchSelected, saveDepSelected} from '../modules/storage.js';

let b_name = loadBranchSelected();

$(document).ready(() => {
    console.log('delete-branch -> ok');
    $("#branch-name").val(b_name);
    $('#branch-delete-form').on('submit', () => {
        if (b_name !== '') {
            $.post(
                "../../services/core.php",
                {
                    "action": "deleteBranch",
                    "b_name": b_name,
                }, successResult
            );
        }
    });
});

function successResult(data) {
    let out = ''
    if (data == 1) {
        removeBranchSelected();
        out += `</br><h5>Філія <strong>${b_name}</strong> успішно видалена</strong></h5>`;
    } else
        out += `</br><h5>Помилка видалення філії</h5>`;
    $('#branch-delete-form').html(out);
}