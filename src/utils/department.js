// department.js
export function extractDepartment(text) {
  const departments = [
    "dentist",
    "cardiology",
    "dermatology",
    "neurology",
    "general",
  ];
  for (let dept of departments) {
    if (text.includes(dept)) return dept;
  }
  return "unknown";
}
