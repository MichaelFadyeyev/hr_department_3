<?php
class Company
{
    private string $name;
    private Branch|array $branches;

    public function __construct($name)
    {
        $this->name = $name;
        $this->branches = [];
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

    public function find_branch($name): bool|int|string
    {
        $b = null;
        foreach ($this->branches as $branch) {
            if ($branch->get_name() === $name) {
                $b = $branch;
                break;
            }
        }
        if ($b === null) {
            return -1;
        } else {
            return array_search($b, $this->branches);
        }
    }

    public function del_branch($name): void
    {
        $k = $this->find_branch($name);
        if ($k > -1) {
            array_splice($this->branches, $k, 1);
        }
    }
}
