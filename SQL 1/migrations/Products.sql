create table
    Products (
        ProductID int PRIMARY KEY,
        ProductName varchar(255),
        SupplierID int REFERENCES Suppliers (SupplierID),
        CategoryID int REFERENCES Categories (CategoryID),
        Unit varchar(255),
        Price decimal(5, 2)
    )