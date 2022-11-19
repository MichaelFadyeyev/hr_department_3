<?php class Department
{
    private string $name;
    private Employee|array $employees;

    public function __construct($name)
    {
        $this->name = $name;
        $this->employees = [];
    }

    public function get_name(): string
    {
        return $this->name;
    }

    public function add_employee($employee): void
    {
        $this->employees[] = $employee;
    }



    public function find_employee($name): bool|int|string
    {
        $e = null;
        foreach ($this->employees as $employee) {
            if ($employee->get_name() === $name) {
                $e = $employee;
                break;
            }
        }
        //
        if ($e === null) {
            return -1;
        } else {
            return array_search($e, $this->employees);
        }
    }

    public function get_employees(): array|Employee
    {
        return $this->employees;
    }

    public function del_employee($name): void
    {
        $k = $this->find_employee($name);
        if ($k > -1) {
            array_splice($this->employees, $k, 1);
        }
    }

    public function display(): void
    {
        $i=1;
        echo '
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Phone</th>
                </tr>
            </thead>
            <tbody>';

        foreach ($this->employees as $employee) {
            echo '
                <tr>
                <th scope="row">' . "{$i}</th>
                    <td>{$employee->get_name()}</td>
                    <td>{$employee->get_position()}</td>
                    <td>{$employee->get_salary()}</td>
                    <td>{$employee->get_phone()}</td>
                </tr>
            ";
            $i++;
        }
        echo '
            </tbody>
        </table>';
    }
}
