<?php
require('data_manager.php');

switch ($_POST['action']) {
    case 'getBranches':
    {
        getBranches();
        break;
    }
    case 'getDeps':
    {
        getDeps();
        break;
    }
    case 'getEmps':
    {
        getEmps();
        break;
    }
    case 'addDep':
    {
        addDep();
        break;
    }
    case 'delDep':
    {
        delDep();
        break;
    }
    case 'editDep':
    {
        editDep();
        break;
    }
    case 'addBranch':
    {
        addBranch();
        break;
    }

}

function initManager(): DataManager
{
    $manager = new DataManager();
//    $manager->init_data();
//    $manager->save_data();
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
            $b->add_department(new Department($d_name));
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

function editDep(): void
{
    if (isset($_POST['b_name']) && isset($_POST['d_name']) && isset($_POST['new_d_name'])) {
        $b_name = $_POST['b_name'];
        $d_name = $_POST['d_name'];
        $new_d_name = $_POST['new_d_name'];
        $manager = initManager();
        $b = $manager->get_company()->find_branch($b_name);
        if ($b !== -1) {
            if ($b->find_department($new_d_name) === -1) {
                $b->find_department($d_name)->set_name($new_d_name);
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
