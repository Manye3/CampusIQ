import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useSaved() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: savedColleges = [], isLoading } = useQuery({
    queryKey: ['savedColleges'],
    queryFn: async () => {
      const res = await fetch('/api/saved');
      if (!res.ok) return [];
      const data = await res.json();
      return data.savedColleges || [];
    },
    enabled: !!session,
  });

  const saveMutation = useMutation({
    mutationFn: async (collegeId: string) => {
      const res = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId }),
      });
      if (!res.ok) throw new Error('Failed to save');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedColleges'] });
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: async (collegeId: string) => {
      const res = await fetch('/api/saved', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId }),
      });
      if (!res.ok) throw new Error('Failed to unsave');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedColleges'] });
    },
  });

  const isSaved = (collegeId: string) =>
    savedColleges.some((sc: any) => sc.collegeId === collegeId || sc.college?.id === collegeId);

  const toggleSave = async (collegeId: string) => {
    if (isSaved(collegeId)) {
      await unsaveMutation.mutateAsync(collegeId);
    } else {
      await saveMutation.mutateAsync(collegeId);
    }
  };

  return {
    savedColleges,
    isLoading,
    isSaved,
    toggleSave,
    isSaving: saveMutation.isPending || unsaveMutation.isPending,
  };
}
