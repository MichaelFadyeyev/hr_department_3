<?php
require_once('../models/employee.php');
require_once('../models/department.php');
require_once('../models/branch.php');
require_once('../models/company.php');

class DataManager implements JsonSerializable
{
    private Company $company;
    private string $data_file;

    public function __construct()
    {
        $this->company = new Company('This Company');
        $this->data_file = '../data/company.dat';
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }

    public function get_company(): Company
    {
        return $this->company;
    }

    public function save_data(): void
    {
        $sf = serialize($this->company);
        file_put_contents($this->data_file, $sf);
    }

    public function load_data(): void
    {
        $sf = file_get_contents($this->data_file);
        $this->company = unserialize($sf);
    }

    public function init_data(): void
    {
        for ($i = 0; $i < 3; $i++) {
            $k = $i + 1;
            $branch = new Branch("Branch - {$k}");

            for ($j = 0; $j < 3; $j++) {
                $m = $j + 1;
                $branch->add_department(new Department("Department - 00{$m}"));
            }
            $this->company->add_branch($branch);
        }

        $this->company->get_branches()[0]->get_departments()[0]->add_employee(new Employee('Vasylenko', 'Junior', 20000, '+380682223344'));
        $this->company->get_branches()[0]->get_departments()[0]->add_employee(new Employee('Petrenko', 'Middle', 30000, '+380681117744'));
        $this->company->get_branches()[0]->get_departments()[1]->add_employee(new Employee('Glushko', 'Senior', 40000, '+380635553322'));

        $this->company->get_branches()[0]->get_departments()[1]->add_employee(new Employee('Kurulenko', 'Middle', 35000, '+380686661144'));
        $this->company->get_branches()[0]->get_departments()[1]->add_employee(new Employee('Dmitrenko', 'Middle', 40000, '+380683333377'));
        $this->company->get_branches()[0]->get_departments()[2]->add_employee(new Employee('Yakovenko', 'Senior', 70000, '+380683335544'));

        $this->company->get_branches()[1]->get_departments()[0]->add_employee(new Employee('Nikolenko', 'Senior', 80000, '+380688882277'));
        $this->company->get_branches()[1]->get_departments()[1]->add_employee(new Employee('Galchenko', 'Junior', 25000, '+380682223366'));
        $this->company->get_branches()[1]->get_departments()[1]->add_employee(new Employee('Kyrilenko', 'Middle', 50000, '+380684443355'));

        $this->company->get_branches()[1]->get_departments()[2]->add_employee(new Employee('Kuba', 'Middle', 80000, '+380688882277'));
        $this->company->get_branches()[1]->get_departments()[2]->add_employee(new Employee('Rudyk', 'Junior', 25000, '+380682223366'));
        $this->company->get_branches()[1]->get_departments()[2]->add_employee(new Employee('Khvoskyk', 'Senior', 50000, '+380684443355'));

        $this->company->get_branches()[2]->get_departments()[0]->add_employee(new Employee('Ogrizko', 'Middle', 34000, '+380688881133'));
        $this->company->get_branches()[2]->get_departments()[0]->add_employee(new Employee('Shelud`ko', 'Middle', 42000, '+380665553366'));
        $this->company->get_branches()[2]->get_departments()[0]->add_employee(new Employee('Smishchuk', 'Senior', 70000, '+380683332211'));

        $this->company->get_branches()[2]->get_departments()[0]->add_employee(new Employee('Grusha', 'Junior', 22000, '+380687772266'));
        $this->company->get_branches()[2]->get_departments()[2]->add_employee(new Employee('Khripko', 'Junior', 25000, '+380689993355'));
        $this->company->get_branches()[2]->get_departments()[2]->add_employee(new Employee('Danylov', 'Middle', 50000, '+380681118833'));
    }
}
