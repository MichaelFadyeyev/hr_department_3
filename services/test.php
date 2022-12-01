<?php

require_once('../models/employee.php');

if ($_POST['action'] == 'testAction') {
    testAction();
}

function testAction()
{
    $e = new Employee("Vasia", "Pos-1", 10000, "+38068");
    echo json_encode($e->jsonSerialize());
}





