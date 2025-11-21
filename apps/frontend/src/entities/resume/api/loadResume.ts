import type { Resumes, ServiceResponse } from "@/shared/api";

export const loadResume = async (
  _resume: Resumes,
): Promise<ServiceResponse> => {
  // TODO: replace with backend
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    recommendations: [
      {
        title: "Добавьте больше навыков",
        subtitle:
          "У вас указано только 2 навыка. Добавление 5-7 ключевых технологий может значительно повысить вашу конкурентоспособность.",
        result: "Увеличение вилки на 15-25%",
      },
    ],
    recommend_vacancies: [
      {
        id: "1",
        company_name: "Tech Solutions Inc.",
        vacancy_name: "Full Stack Developer",
        experience: { from: 3, to: 8 },
        schedule: "Full-time",
        work_hours: 40,
        salary: { from: 60000, to: 100000 },
        location: "Remote",
        description:
          "Looking for a Full Stack Developer with experience in TypeScript and React.",
        skills: ["TypeScript", "React", "Node.js", "SQL"],
      },
      {
        id: "2",
        company_name: "Finance Corp.",
        vacancy_name: "Data Analyst",
        experience: { from: 3, to: 8 },
        schedule: "Part-time",
        work_hours: 20,
        salary: { from: 60000, to: 100000 },
        location: "New York, NY",
        description:
          "Seeking a Data Analyst with strong Excel and data visualization skills.",
        skills: ["Excel", "SQL", "Tableau", "Data Cleaning"],
      },
      {
        id: "3",
        company_name: "HealthTech Ltd.",
        vacancy_name: "UX/UI Designer",
        experience: { from: 3, to: 8 },
        schedule: "Full-time",
        work_hours: 40,
        salary: { from: 60000, to: 100000 },
        location: "Remote",
        description:
          "Join us to design user-friendly interfaces for our healthcare applications.",
        skills: ["Figma", "Sketch", "User Research", "Prototyping"],
      },
      {
        id: "4",
        company_name: "Marketing Agency",
        vacancy_name: "Content Writer",
        experience: { from: 3, to: 8 },
        schedule: "Full-time",
        work_hours: 40,
        salary: { from: 60000, to: 100000 },
        location: "Los Angeles, CA",
        description:
          "Looking for a creative Content Writer to develop engaging marketing content.",
        skills: ["SEO", "Blogging", "Copywriting", "Social Media"],
      },
      {
        id: "5",
        company_name: "E-Commerce Co.",
        vacancy_name: "Customer Service Representative",
        experience: { from: 3, to: 8 },
        schedule: "Full-time",
        work_hours: 40,
        salary: { from: 60000, to: 100000 },
        location: "Chicago, IL",
        description:
          "Provide excellent customer service and support to our clients.",
        skills: [
          "Communication",
          "Problem Solving",
          "CRM Software",
          "Time Management",
        ],
      },
    ],
    salary: { from: 300000, to: 500000 },
  };
};
