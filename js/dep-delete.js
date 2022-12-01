let b_name = '';
let d_name = '';

$(document).ready(function () {
    console.log('del-dep -> ok');
    b_name = decodeData()[0];
    d_name = decodeData()[1];
    console.log(`${b_name}, ${d_name}`);
    $('#branch-name')[0].value = b_name;
    $('#dep-name')[0].value = d_name;
    $('#dep-delete-form').one('submit', function () {
        if (d_name !== '') {
            $.post(
                "services/core.php",
                {
                    "action": "delDep",
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
        out += `</br><h5>Відділ <strong>${d_name}</strong> успішно видалений <strong>${b_name}</strong></h5>`;
    } else {
        out += `</br><h5>Помилка видалення відділу</h5>`;
    }
    $('#dep-delete').html(out);
}

function decodeData() {
    return (decodeURIComponent(window.location.hash.substring(1))).split(',');
}
