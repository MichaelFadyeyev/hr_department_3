import {saveBranchSelected, saveDepSelected} from '../modules/storage.js';

let b_name = '';


$(document).ready(() => {
    console.log('add-branch -> ok');
    $('#branch-add-form').on('submit', () => {
        b_name = $("#branch-name").val();
        if (b_name !== '') {
            $.post(
                "../../services/core.php",
                {
                    "action": "addBranch",
                    "b_name": b_name
                }, successResult
            );
        }
    });
});

function successResult(data) {
    let out = ''
    if (data == 1) {
        saveBranchSelected(b_name);
        out += `</br><h5>Філія <strong>${b_name}</strong> успішно додана</strong></h5>`;
    } else
        out += `</br><h5>Помилка додавання нової філії</h5>`;
    $('#branch-add').html(out);
}