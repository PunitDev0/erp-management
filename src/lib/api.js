// Mock API functions (replace with real API endpoints)
export const getStudents = async () => [
    { id: 1, name: "John Doe", dob: "2000-01-01", place: "Delhi", schoolDetails: "XYZ School", type: "student" },
    { id: 2, name: "Jane Smith", dob: "2001-02-02", place: "Mumbai", schoolDetails: "ABC School", type: "student" },
    { id: 3, name: "Mr. Kumar", dob: "1980-05-10", place: "Chennai", department: "Teaching", type: "staff" },
  ];
  
  export const addStudent = async (data) => ({ id: Math.random(), ...data });
  
  export const updateStudent = async (id, data) => ({ id, ...data });
  
  export const deleteStudent = async (id) => ({ success: true });
  
  export const getAttendance = async () => [
    { id: 1, studentId: 1, date: "2025-07-01", status: "Present" },
    { id: 2, studentId: 2, date: "2025-07-01", status: "Absent" },
  ];
  
  export const addAttendance = async (data) => ({ id: Math.random(), ...data });