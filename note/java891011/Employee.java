package com.citi.java891011;

import java.util.Objects;

public class Employee {
    private String name;
    private Integer age;
    private Long salary;
    private Enum status;
    private Double inav;

    public Employee() {
        System.out.println("我是无参构造器");
    }

    public Employee(String name) {
        this.name = name;
        System.out.println("我是一个有参构造器");
    }

    public Employee(String name, Integer age) {
        this.name = name;
        this.age = age;
        System.out.println("我是两个有参构造器");
    }


    public Employee(String name, Integer age, Long salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    public Employee(String name, Integer age, Long salary, Enum status, Double inav) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.status = status;
        this.inav = inav;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Long getSalary() {
        return salary;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public Enum getStatus() {
        return status;
    }

    public void setStatus(Enum status) {
        this.status = status;
    }

    public Double getInav() {
        return inav;
    }

    public void setInav(Double inav) {
        this.inav = inav;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", salary=" + salary +
                ", status=" + status +
                ", inav=" + inav +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        return getName().equals(employee.getName()) && getAge().equals(employee.getAge()) && getSalary().equals(employee.getSalary());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getAge(), getSalary());
    }


}


