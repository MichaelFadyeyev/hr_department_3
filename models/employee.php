<?php class Employee
{
    private $name;
    private $position;
    private $salary;
    private $phone;

    public function __construct($name, $position, $salary, $phone)
    {
        $this->name = $name;
        $this->position = $position;
        $this->salary = $salary;
        $this->phone = $phone;
    }

    public function get_name()
    {
        return $this->name;
    }

    public function get_phone()
    {
        return $this->phone;
    }

    public function get_position()
    {
        return $this->position;
    }

    public function get_salary()
    {
        return $this->salary;
    }
}
