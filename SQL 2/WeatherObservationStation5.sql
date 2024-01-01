(
    SELECT
        CITY,
        LENGTH (CITY)
    FROM
        STATION
    WHERE
        LENGTH (CITY) = (
            SELECT
                MIN(LENGTH (CITY))
            FROM
                STATION
        )
    ORDER BY
        CITY
    LIMIT
        1
)
UNION
(
    SELECT
        CITY,
        LENGTH (CITY)
    FROM
        STATION
    WHERE
        LENGTH (CITY) = (
            SELECT
                MAX(LENGTH (CITY))
            FROM
                STATION
        )
    ORDER BY
        CITY
    LIMIT
        1
);