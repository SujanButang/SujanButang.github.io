create table
    Orders (
        OrderID int PRIMARY KEY,
        CustomerID int REFERENCES Customers (CustomerID),
        EmployeeID int REFERENCES Employees (EmployeeID),
        OrderDate date,
        ShipperID int REFERENCES Shippers (ShipperID)
    )