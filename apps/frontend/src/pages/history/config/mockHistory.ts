import type { RecommendationDto, SalaryDto } from "@/shared/api";

export const mockHistory: {
  id: string;
  role: string;
  experience: number;
  location: string;
  skills: string[];
  salary: SalaryDto;
  recommendations: RecommendationDto[];
}[] = [
  {
    id: "1",
    role: "Frontend Developer",
    experience: 3,
    location: "Kyiv, Ukraine",
    skills: ["React", "TypeScript", "CSS Modules", "Vite", "Jest"],
    salary: {
      from: 40000,
      to: 60000,
    },
    recommendations: [
      {
        title: "Outstanding UI Implementation",
        subtitle: "TechNova • Senior Product Manager",
        result:
          "Delivered pixel-perfect interfaces that reduced user-reported bugs by 40%.",
      },
    ],
  },
  {
    id: "2",
    role: "DevOps Engineer",
    experience: 5,
    location: "Berlin, Germany",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "ArgoCD",
      "Prometheus",
    ],
    salary: {
      from: 65000,
      to: 90000,
    },
    recommendations: [
      {
        title: "Infrastructure Transformation",
        subtitle: "CloudFlow GmbH • CTO",
        result:
          "Led migration to cloud-native stack, cutting deployment time by 70%.",
      },
      {
        title: "Reliable & Proactive",
        subtitle: "DataSphere • Engineering Lead",
        result:
          "Ensured 99.99% uptime during company-wide scalability initiative.",
      },
    ],
  },
  {
    id: "3",
    role: "Data Scientist",
    experience: 4,
    location: "Remote (USA-based)",
    skills: ["Python", "Pandas", "Scikit-learn", "SQL", "XGBoost", "MLflow"],
    salary: {
      from: 100000,
      to: 130000,
    },
    recommendations: [
      {
        title: "High-Impact Predictive Modeling",
        subtitle: "Insight Analytics • Head of Product",
        result:
          "Built churn prediction model that increased retention by 22% in Q3.",
      },
    ],
  },
  {
    id: "4",
    role: "Mobile Developer (iOS)",
    experience: 2,
    location: "Warsaw, Poland",
    skills: [
      "Swift",
      "SwiftUI",
      "Combine",
      "Core Data",
      "TestFlight",
      "XCTest",
    ],
    salary: {
      from: 15000,
      to: 22000,
    },
    recommendations: [
      {
        title: "Rapid Feature Delivery",
        subtitle: "AppGenius • iOS Team Lead",
        result:
          "Shipped 3 major app updates ahead of schedule with zero critical bugs.",
      },
    ],
  },
];
