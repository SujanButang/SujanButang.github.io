create table
    OrderDetails (
        OrderDetailID int PRIMARY KEY,
        OrderID int REFERENCES Orders (OrderID),
        ProductID int REFERENCES Products (ProductID),
        Quantity int
    )