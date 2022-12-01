<?php

class Company implements JsonSerializable
{
    private string $name;
    private Branch|array $branches;

    public function __construct($name)
    {
        $this->name = $name;
        $this->branches = [];
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }

    public function get_name(): string
    {
        return $this->name;
    }

    public function get_branches(): array
    {
        return $this->branches;
    }

    public function add_branch($branch): void
    {
        $this->branches[] = $branch;
    }

    public function find_branch($name): Branch|int
    {
        foreach ($this->branches as $branch) {
            if ($branch->get_name() === $name)
                return $branch;
        }
        return -1;
    }

    public function find_branch_index($name): int
    {
        $b = $this->find_branch($name);
        if ($b === -1) return $b;
        else {
            return array_search($b, $this->branches);
        }
    }

    public function del_branch($name): void
    {
        $k = $this->find_branch_index($name);
        if ($k > -1) {
            array_splice($this->branches, $k, 1);
        }
    }
}
