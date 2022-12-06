<?php class Department implements JsonSerializable
{
    private string $name;
    private Employee|array $employees;
    private string|array $positions;

    public function __construct($name)
    {
        $this->name = $name;
        $this->employees = [];
        $this->positions = [];
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

    //// employees //////////////////////////////////
    public function add_employee($employee): void
    {
        $this->employees[] = $employee;
    }

    public function find_employee($name): Employee|int
    {
        foreach ($this->employees as $employee) {
            if ($employee->get_name() === $name)
                return $employee;
        }
        return -1;
    }

    public function find_employee_index($name): bool|int|string
    {
        $e = $this->find_employee($name);
        if ($e === -1) return -1;
        return array_search($e, $this->employees);
    }

    public function get_employees(): array|Employee
    {
        return $this->employees;
    }

    public function del_employee($name): void
    {
        $k = $this->find_employee_index($name);
        if ($k > -1) {
            array_splice($this->employees, $k, 1);
        }
    }

        //// positions //////////////////////////////////
        public function get_positions(): array
        {
            return $this->positions;
        }
    
        public function add_position($position): void
        {
            $this->positions[] = $position;
            return;
        }
}
