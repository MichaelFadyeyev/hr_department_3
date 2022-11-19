<?php

class Branch
{
    private string $name;
    private Department|array $departments;

    public function __construct($name)
    {
        $this->name = $name;
        $this->departments = [];
    }

    public function get_name(): string
    {
        return $this->name;
    }

    public function get_departments(): Department|array
    {
        return $this->departments;
    }

    public function add_department($department): void
    {
        $this->departments[] = $department;
    }

    public function find_department($name): bool|int|string
    {
        $d = null;
        foreach ($this->departments as $department) {
            if ($department->get_name() === $name) {
                $d = $department;
                break;
            }
        }
        if ($d === null) {
            return -1;
        } else {
            return array_search($d, $this->departments);
        }
    }

    public function del_department($name): void
    {
        $k = $this->find_department($name);
        if ($k > -1) {
            array_splice($this->departments, $k, 1);
        }
    }

    public function display(): void
    {
        $i = 1;
        echo '
        <form action="#" method="post">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Dep. name</th>
                    <th scope="col">Employees</th>
                </tr>
            </thead>
            <tbody>';

        foreach ($this->departments as $d) {
            $d_emp_count = count($d->get_employees());
            echo '
                <tr>
                    <th scope="row">' . "{$this->show_emps_btn($i)}</th>
                    <td>{$d->get_name()}</td>
                    <td>$d_emp_count</td>
                </tr>
            ";
            $i++;
        }
        echo '
            </tbody>
        </table>
        
        </form>';
    }

    function show_emps_btn($i): string
    {
        return '<input type="submit" name= "get_dep" value="'.$i.'"/>';
    }
}
