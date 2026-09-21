import { api } from "@/src/lib/axios";

export interface ProjectUser {
  id: string;
  FirstName: string;
  LastName: string;
  profilePhoto: string | null;
  bio?: string | null;
  location?: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;

  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;

  requiredMembers: number;
  currentMembers: number;
  spotsAvailable: number;

  status: "OPEN" | "FULL" | "COMPLETED" | "CANCELLED";

  owner: ProjectUser;

  applicationCount?: number;

  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: string;
  joinedAt: string;
  user: ProjectUser;
}

export interface ProjectApplication {
  id: string;
  projectId: string;
  applicantId: string;
  message: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  createdAt: string;
  updatedAt: string;
  applicant: ProjectUser;
}

export interface ProjectDetail extends Project {
  members: ProjectMember[];

  viewer: {
    isOwner: boolean;
    isMember: boolean;
    applicationStatus:
      | "PENDING"
      | "ACCEPTED"
      | "REJECTED"
      | "WITHDRAWN"
      | null;
  };
}

export const getProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects");

  return res.data.data;
};


export const getProjectById = async (
  projectId: string
): Promise<ProjectDetail> => {
  const res = await api.get(`/projects/${projectId}`);

  return res.data.data;
};


export const createProject = async (data: {
  title: string;
  description?: string;
  requiredMembers: number;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
}) => {
  const res = await api.post("/projects", data);

  return res.data.data;
};


export const applyToProject = async ({
  projectId,
  message,
}: {
  projectId: string;
  message?: string;
}) => {
  const res = await api.post(
    `/projects/${projectId}/apply`,
    {
      message,
    }
  );

  return res.data.data;
};


export const getProjectApplications = async (
  projectId: string
): Promise<ProjectApplication[]> => {
  const res = await api.get(
    `/projects/${projectId}/applications`
  );

  return res.data.data;
};

export const acceptProjectApplication = async ({
  projectId,
  applicationId,
}: {
  projectId: string;
  applicationId: string;
}) => {
  const res = await api.patch(
    `/projects/${projectId}/applications/${applicationId}/accept`
  );

  return res.data.data;
};


export const rejectProjectApplication = async ({
  projectId,
  applicationId,
}: {
  projectId: string;
  applicationId: string;
}) => {
  const res = await api.patch(
    `/projects/${projectId}/applications/${applicationId}/reject`
  );

  return res.data.data;
};


export const withdrawApplication = async (
  projectId: string
) => {
  const res = await api.delete(
    `/projects/${projectId}/applications/me`
  );

  return res.data.data;
};