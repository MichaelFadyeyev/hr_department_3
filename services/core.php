<?php
require('data_manager.php');

switch ($_POST['action']) {
    case 'getBranches': {
            getBranches();
            break;
        }
    case 'getDeps': {
            getDeps();
            break;
        }
    case 'getEmps': {
            getEmps();
            break;
        }
    case 'addDep': {
            addDep();
            break;
        }
    case 'delDep': {
            delDep();
            break;
        }
    case 'editDep': {
            editDep();
            break;
        }
    case 'addBranch': {
            addBranch();
            break;
        }
    case 'editBranch': {
            editBranch();
            break;
        }
    case 'deleteBranch': {
            deleteBranch();
            break;
        }
    case 'addEmp': {
            addEmp();
            break;
        }
    case 'editEmp': {
            editEmp();
            break;
        }
    case 'deleteEmp': {
            deleteEmp();
            break;
        }
}

function initManager(): DataManager
{
    $manager = new DataManager();
    // $manager->init_data();
    // $manager->save_data();
    $manager->load_data();
    return $manager;
}

function getBranches(): void
{
    $manager = initManager();
    $branches = $manager->get_company()->get_branches();
    $b_names = array();
    foreach ($branches as $branch) {
        $b_names[] = $branch->get_name();
    }
    echo json_encode($b_names);
}

function getDeps(): void
{
    if (isset($_POST['b_name'])) {
        $b_name = $_POST['b_name'];
        $b = findBranch($b_name);
        if ($b === -1)
            echo -1;
        else
            echo json_encode(findBranch($b_name)->get_departments());
    }
}

function addDep(): void
{
    if (isset($_POST['b_name']) && isset($_POST['d_name'])) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        $manager = initManager();
        $b = $manager->get_company()->find_branch($b_name);
        if ($b !== -1) {
            $d = new Department($d_name);
            $d->add_position('Junior');
            $d->add_position('Middle');
            $d->add_position('Senior');
            $b->add_department($d);
            $manager->save_data();
            echo 1;
        } else
            echo -1;
    } else
        echo -1;
}

function delDep(): void
{
    if (isset($_POST['b_name']) && isset($_POST['d_name'])) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        $manager = initManager();
        $b = $manager->get_company()->find_branch($b_name);
        if ($b !== -1) {
            $b->del_department($d_name);
            $manager->save_data();
            echo 1;
        } else
            echo -1;
    } else
        echo -2;
}

function editDep(): void ///////////// to fix /////////////
{
    if (
        isset($_POST['b_name']) &&
        isset($_POST['new_b_name']) &&
        isset($_POST['d_name']) &&
        isset($_POST['new_d_name'])
    ) {
        $b_name = $_POST['b_name'];
        $new_b_name = $_POST['new_b_name'];
        $d_name = $_POST['d_name'];
        $new_d_name = $_POST['new_d_name'];

        $manager = initManager();
        $c = $manager->get_company();
        $b = $c->find_branch($b_name);
        if ($b !== -1) {
            if ($b_name === $new_b_name) {

            } else {
            }
            if ($b->find_department($new_d_name) === -1) {
                $d = $b->find_department($d_name);
                $d->set_name($new_d_name);
                if ($b_name != $new_b_name) {
                    $new_b = $c->find_branch($new_b_name);
                    if ($new_b !== -1) {
                        $new_b->add_department($d);
                        $b->del_department($d_name);
                    }
                }
                $manager->save_data();
                echo 1;
            }
        } else
            echo -1;
    } else
        echo -1;
}

function getEmps(): void
{
    if (isset($_POST['b_name']) && isset($_POST['d_name'])) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        //        echo json_encode(findBranch($b_name)->get_departments());
        echo json_encode(findBranch($b_name)->find_department($d_name)->get_employees());
    }
}

function findBranch($b_name): Branch
{
    $manager = initManager();
    return $manager->get_company()->find_branch($b_name);
}

function addBranch(): void
{
    $manager = initManager();
    if (isset($_POST['b_name'])) {
        $b_name = $_POST['b_name'];
        if ($manager->get_company()->find_branch($b_name) == -1) {
            $manager->get_company()->add_branch(new Branch($b_name));
            $manager->save_data();
            echo 1;
        } else
            echo -1;
    } else
        echo 0;
}

function editBranch(): void
{
    $manager = initManager();
    if (isset($_POST['b_name']) && isset($_POST['new_b_name'])) {
        $b_name = $_POST['b_name'];
        $new_b_name = $_POST['new_b_name'];
        $b = $manager->get_company()->find_branch($b_name);
        if ($b !== -1) {
            $b->set_name($new_b_name);
            $manager->save_data();
            echo 1;
        } else
            echo -1;
    } else
        echo 0;
}

function deleteBranch(): void
{
    $manager = initManager();
    if (isset($_POST['b_name'])) {
        if ($manager->get_company()->del_branch($_POST['b_name']) === 1) {
            $manager->save_data();
            echo 1;
        }
    } else
        echo 0;
}

function addEmp(): void
{
    $manager = initManager();
    if (
        isset($_POST['b_name']) &&
        isset($_POST['d_name']) &&
        isset($_POST['e_name']) &&
        isset($_POST['position']) &&
        isset($_POST['salary']) &&
        isset($_POST['phone'])
    ) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        $e_name = $_POST['e_name'];
        $position = $_POST['position'];
        $salary = intval($_POST['salary']);
        $phone = $_POST['phone'];

        $b = $manager->get_company()->find_branch($b_name);
        $d = $b->find_department($d_name);
        $d->add_employee(new Employee($e_name, $position, $salary, $phone));
        $manager->save_data();
        echo 1;
    } else echo 0;
}

function editEmp(): void
{
    $manager = initManager();
    if (
        isset($_POST['b_name']) &&
        isset($_POST['d_name']) &&
        isset($_POST['new_d_name']) &&
        isset($_POST['e_name']) &&
        isset($_POST['new_e_name']) &&
        isset($_POST['position']) &&
        isset($_POST['salary']) &&
        isset($_POST['phone'])
    ) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        $new_d_name = $_POST['new_d_name'];
        $e_name = $_POST['e_name'];
        $new_e_name = $_POST['new_e_name'];
        $position = $_POST['position'];
        $salary = intval($_POST['salary']);
        $phone = $_POST['phone'];

        $b = $manager->get_company()->find_branch($b_name);
        $d = $b->find_department($d_name);
        if ($new_d_name !== $d_name) {
            $new_e = new Employee(
                $new_e_name,
                $position,
                $salary,
                $phone
            );
            $d->del_employee($e_name);
            $d = $b->find_department($new_d_name);
            $d->add_employee($new_e);
        } else {
            $e = $d->find_employee($e_name);
            $e->set_name($new_e_name);
            $e->set_position($position);
            $e->set_salary($salary);
            $e->set_phone($phone);
        }
        $manager->save_data();
        echo 1;
    } else echo 0;
}

function deleteEmp(): void
{
    $manager = initManager();
    if (
        isset($_POST['b_name']) &&
        isset($_POST['d_name']) &&
        isset($_POST['e_name'])
    ) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        $e_name = $_POST['e_name'];

        $b = $manager->get_company()->find_branch($b_name);
        $d = $b->find_department($d_name);
        $d->del_employee($e_name);
        $manager->save_data();
        echo 1;
    } else echo -1;
}
