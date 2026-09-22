import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProjects,
  getProjectById,
  applyToProject,
  getProjectApplications,
  acceptProjectApplication,
  rejectProjectApplication,
  withdrawApplication
} from "../../API/User/Project/project.api";
import toast from "react-hot-toast";


export const projectKeys = {
  all: ["projects"] as const,

  lists: () => [...projectKeys.all, "list"] as const,

  detail: (id: string) =>
    [...projectKeys.all, "detail", id] as const,

  applications: (id: string) =>
    [...projectKeys.all, "applications", id] as const,
};


export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: getProjects,
  });
};


export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
};


export const useApplyToProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyToProject,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.projectId),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },

    onError: (error: any) => {
      toast.error(
        "Failed to apply to project:",
        error
      );
    },
  });
};


export const useProjectApplications = (
  projectId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: projectKeys.applications(projectId),
    queryFn: () =>
      getProjectApplications(projectId),
    enabled: !!projectId && enabled,
  });
};


export const useAcceptApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptProjectApplication,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(
          variables.projectId
        ),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(
          variables.projectId
        ),
      });
    },
  });
};


export const useRejectApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectProjectApplication,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(
          variables.projectId
        ),
      });
    },
  });
};


export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawApplication,

    onSuccess: (_, projectId) => {
      // Refresh project detail
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });

      // Refresh applications
      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(projectId),
      });

      // Refresh project list
      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },
  });
};