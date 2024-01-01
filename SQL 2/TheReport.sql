SELECT
    CASE
        WHEN (
            SELECT
                grade
            FROM
                grades
            WHERE
                s.marks <= max_mark
                AND s.marks >= min_mark
        ) >= 8 THEN name
        ELSE 'NULL'
    END AS student_name,
    (
        SELECT
            grade
        FROM
            grades
        WHERE
            s.marks <= max_mark
            AND s.marks >= min_mark
    ) AS student_grade,
    marks
FROM
    students s
ORDER BY
    student_grade DESC,
    student_name,
    marks;