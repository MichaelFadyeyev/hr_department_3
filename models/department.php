<?php class Department implements JsonSerializable
{
    private string $name;
    private Employee|array $employees;

    public function __construct($name)
    {
        $this->name = $name;
        $this->employees = [];
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }

    public function set_name($name): void
    {
        $this->name = $name;
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
}
