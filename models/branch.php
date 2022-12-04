<?php

class Branch implements JsonSerializable
{
    private string $name;
    private Department|array $departments;

    public function __construct($name)
    {
        $this->name = $name;
        $this->departments = [];
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }

    public function get_name(): string
    {
        return $this->name;
    }

    public function set_name($name): void
    {
        $this->name = $name;
    }

    public function get_departments(): Department|array
    {
        return $this->departments;
    }

    public function add_department($department): void
    {
        $this->departments[] = $department;
    }

    public function find_department($name): Department|int
    {
        foreach ($this->departments as $department) {
            if ($department->get_name() === $name)
                return $department;
        }
        return -1;
    }

    public function find_department_index($name): int
    {
        $d = $this->find_department($name);
        if ($d === -1) return -1;
        return array_search($d, $this->departments);
    }

    public function del_department($name): void
    {
        $k = $this->find_department_index($name);
        if ($k > -1) {
            array_splice($this->departments, $k, 1);
        }
    }
}
