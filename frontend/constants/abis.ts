export const EXAM_MANAGEMENT_ABI = [
  // Exam Management Functions
  "function createExam(string title, string description, uint256 date) public returns (string)",
  "function updateExamStatus(string examId, string status) public",
  "function registerStudents(string examId, address[] students) public",
  "function submitResults(string examId, tuple(address studentAddress, uint256 score, string grade, string notes)[] results) public",
  "function getInstitutionExams(address institution) public view returns (tuple(string id, string title, string description, uint256 date, string status, address[] enrolledStudents)[])",
  
  // Certificate Management Functions
  "function issueCertificate(address student, string title, string description, string ipfsHash) public returns (string)",
  "function getInstitutionCertificates(address institution) public view returns (tuple(string id, address student, string title, string description, uint256 issueDate, string ipfsHash, string status)[])",
  
  // Access Control Functions
  "function isInstitution(address account) public view returns (bool)",
  
  // Events
  "event ExamCreated(string indexed examId, address indexed institution, string title)",
  "event ExamStatusUpdated(string indexed examId, string status)",
  "event StudentsRegistered(string indexed examId, address[] students)",
  "event ResultsSubmitted(string indexed examId, address[] students)",
  "event CertificateIssued(string indexed certificateId, address indexed student, address indexed institution)"
]; 