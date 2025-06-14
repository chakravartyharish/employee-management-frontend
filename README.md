# Employee Management System

A full-stack employee management application built with Angular frontend and Spring Boot backend.

## Project Structure

```
employee-management-system/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/interview/employee_management/
│   │       ├── controller/     # REST Controllers
│   │       ├── dto/           # Data Transfer Objects
│   │       ├── entity/        # JPA Entities
│   │       ├── repository/    # Data Repositories
│   │       ├── service/       # Business Logic
│   │       └── config/        # Configuration Classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
└── frontend/                   # Angular Application
    ├── src/
    │   ├── app/
    │   │   ├── app.component.ts
    │   │   ├── app.component.html
    │   │   ├── app.component.css
    │   │   └── app.module.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    ├── proxy.conf.json
    └── tsconfig.json
```

## Features

- **Employee Management**: Add, view, edit, and delete employees
- **Department Management**: Organize employees by departments
- **Responsive Design**: Bootstrap 5 with mobile-first approach
- **PDF Report Generation**: JasperReports for employee reports
- **RESTful API**: Complete CRUD operations
- **Real-time Updates**: Instant UI updates after operations
- **Data Validation**: Form validation on both frontend and backend
- **Transaction Management**: Proper database transaction handling

## Technologies Used

### Backend
- **Spring Boot 3.2.0** - Main framework
- **Spring Data JPA** - Database abstraction
- **MySQL Database** - Production-ready relational database
- **JasperReports** - PDF report generation
- **Bean Validation** - Input validation
- **Maven** - Dependency management

### Frontend
- **Angular 16** - Frontend framework
- **Bootstrap 5.3** - CSS framework
- **Font Awesome 6** - Icons
- **RxJS** - Reactive programming
- **TypeScript** - Type safety

## Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Node.js 18** or higher
- **npm 9** or higher
- **Maven 3.6** or higher
- **Angular CLI 16** or higher

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Configure MySQL Database:**
   - Ensure MySQL Server is installed and running
   - By default, the application connects to:
     - URL: `jdbc:mysql://localhost:3306/employee_management`
     - Username: `root`
     - Password: `root`
   - These settings can be modified in `application.properties`
   - The database will be created automatically if it doesn't exist

3. **Install dependencies and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Verify backend is running:**
   - API Base URL: `http://localhost:8080/api`
   - MySQL Database: Employee management data stored in MySQL
   - Sample data is automatically loaded on startup

### Backend Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | Get all departments |
| GET | `/api/departments/with-employees` | Get departments with employees |
| GET | `/api/departments/{id}` | Get department by ID |
| POST | `/api/departments` | Create new department |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| GET | `/api/employees/department/{deptId}` | Get employees by department |
| POST | `/api/employees/department/{deptId}` | Add employee to department |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/reports/employee-pdf` | Generate PDF report |

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Angular CLI globally (if not already installed):**
   ```bash
   npm install -g @angular/cli@16
   ```

4. **Start the development server:**
   ```bash
   ng serve
   ```
   OR
   ```bash
   npm start
   ```

5. **Access the application:**
   - Open your browser to `http://localhost:4200`

## Sample Data

The application comes with pre-loaded sample data:

### Departments
- **HR Department** (dept01) - Building A
- **Engineering Department** (dept02) - Building B

### Employees
- **Alice Smith** - Recruiter, HR Department, $60,000
- **Bob Johnson** - Software Engineer, Engineering, $80,000
- **Charlie Brown** - HR Assistant, HR Department, $40,000
- **Diana Prince** - System Architect, Engineering, $90,000

## Usage Instructions

### 1. Viewing Employees
- Select a department from the dropdown
- Click "Search" to view employees in that department
- Click on any employee row to view details

### 2. Adding New Employee
- Select a department first
- Click "Add New Employee"
- Fill out the employee form
- Click "Save" to add the employee

### 3. Editing Employee
- View an employee's details
- Click "Edit" button
- Modify the information
- Click "Save" to update

### 4. Deleting Employee
- View an employee's details
- Click "Delete" button
- Confirm deletion in the dialog

### 5. Generating PDF Report
- Click "Generate PDF Report" in the header
- The report will open in a new tab/window

## Development

### Running in Development Mode

**Backend:**
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Frontend:**
```bash
cd frontend
ng serve --open
```

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/employee-management-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
ng build --configuration production
```

### Database Access

During development, you can access the H2 database console:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all departments
curl -X GET http://localhost:8080/api/departments

# Get employees in a department
curl -X GET http://localhost:8080/api/employees/department/dept01

# Add new employee
curl -X POST http://localhost:8080/api/employees/department/dept01 \
  -H "Content-Type: application/json" \
  -d '{
    "id": "emp005",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Developer",
    "salary": 75000
  }'
```

## Troubleshooting

### Common Issues

1. **Port Already in Use:**
   - Change backend port in `application.properties`: `server.port=8081`
   - Change frontend port: `ng serve --port 4201`

2. **CORS Issues:**
   - Backend has CORS enabled with `@CrossOrigin(origins = "*")`
   - For production, specify exact origins

3. **Database Connection:**
   - H2 is in-memory, data resets on restart
   - Check H2 console for database state

4. **Angular Build Errors:**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Angular cache: `ng cache clean`

5. **PDF Generation Issues:**
   - Ensure JasperReports dependencies are included
   - Check for Java version compatibility

## Architecture Highlights

### Backend Architecture
- **Layered Architecture**: Controller → Service → Repository
- **DTO Pattern**: Separate data transfer objects
- **Transaction Management**: `@Transactional` annotations
- **Exception Handling**: Proper error responses
- **Validation**: Bean validation on DTOs

### Frontend Architecture
- **Component-Based**: Single main component for simplicity
- **Service Integration**: HTTP client for API calls
- **Reactive Programming**: RxJS observables
- **Responsive Design**: Bootstrap grid system
- **Form Handling**: Template-driven forms with validation

## Additional Features Demonstrated

1. **Map and List Usage**: Various collection operations in services
2. **Transaction Management**: Proper database transaction handling
3. **PDF Generation**: JasperReports integration
4. **Responsive Design**: Mobile-friendly interface
5. **Error Handling**: Comprehensive error management
6. **Data Validation**: Client and server-side validation
7. **Loading States**: User feedback during operations

## Future Enhancements

- Authentication and authorization
- Employee photo uploads
- Advanced search and filtering
- Email notifications
- Audit trail
- Department hierarchy
- Performance optimization
- Unit and integration tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.
