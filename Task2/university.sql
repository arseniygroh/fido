CREATE TABLE students(student_id SERIAL PRIMARY KEY, first_name VARCHAR(64) NOT NULL, second_name VARCHAR(64) NOT NULL, middle_name VARCHAR(64) NOT NULL, birthday DATE, email VARCHAR(200) NOT NULL UNIQUE, phone VARCHAR(20) NOT NULL UNIQUE, admission_year INT NOT NULL);

CREATE TABLE courses(course_id SERIAL PRIMARY KEY, course_name VARCHAR(100) NOT NULL, description TEXT, credits INT NOT NULL, number_of_hours INT NOT NULL);


CREATE TABLE students_courses(id SERIAL PRIMARY KEY, course_id INT REFERENCES courses(course_id), student_id INT REFERENCES students(student_id), group_num INT NOT NULL);

INSERT INTO courses (course_name, description, credits, number_of_hours) VALUES
('Програмування', 'Основи розробки програмного забезпечення', 5, 150),
('Бази даних', 'Проектування реляційних баз даних', 4, 120),
('Комп''ютерні мережі', 'Архітектура та протоколи мереж', 4, 120);

INSERT INTO students (first_name, second_name, middle_name, birthday, email, phone, admission_year) VALUES
('Ліонель', 'Мессі', 'Андреас', '2005-04-12', 'l.messi@example.com', '+380501111111', 2024),
('Кріштіану', 'Роналду', 'Батькович', '2004-11-23', 'с.ronaldo@example.com', '+380502222222', 2024),
('Усман', 'Дембеле', 'Батькович', '2006-01-15', 'u.dembele@example.com', '+380503333333', 2025),
('Кіліан', 'Мбаппе', 'Батькович', '2005-08-30', 'o.dembele@example.com', '+380504444444', 2024),
('Ламін', 'Ямаль', 'Батькович', '2004-05-05', 'l.yamal@example.com', '+380505555555', 2023),
('Міша', 'Мудрик', 'Батькович', '2006-12-10', 'm.mudryk@example.com', '+380506666666', 2025);

INSERT INTO students_courses (course_id, student_id, group_num) VALUES
(1, 1, 5),
(1, 2, 5), 
(1, 3, 2),
(2, 4, 5),
(1, 5, 5), 
(3, 6, 1);

SELECT first_name, second_name, middle_name, email FROM students JOIN students_courses USING(student_id) JOIN courses USING(course_id) WHERE course_name = 'Програмування' AND group_num = 5;