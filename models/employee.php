<?php class Employee implements JsonSerializable
{
    private string $name;
    private string $position;
    private int $salary;
    private string $phone;

    public function __construct($name, $position, $salary, $phone)
    {
        $this->name = $name;
        $this->position = $position;
        $this->salary = $salary;
        $this->phone = $phone;
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }

    public function set_name($name)
    {
        $this->name = $name;
    }

    public function set_position($position)
    {
        $this->position = $position;
    }

    public function set_salary($salary)
    {
        $this->salary = $salary;
    }

    public function set_phone($phone)
    {
        $this->phone = $phone;
    }

    public function get_name(): string
    {
        return $this->name;
    }

    public function get_phone(): string
    {
        return $this->phone;
    }

    public function get_position(): string
    {
        return $this->position;
    }

    public function get_salary(): int
    {
        return $this->salary;
    }
}
