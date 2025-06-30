import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GeneratedArtifacts {
  'prd.md': string;
  'tech_stack.md': string;
  'ai_directives.md': string;
  'schema.sql': string;
  'schema-er-diagram.md': string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  html_url: string;
  updated_at: string;
  isLocal?: boolean; // Flag to identify local storage repositories
}

interface ProjectState {
  vibe: string;
  targetAudience: string;
  problemStatement: string;
  coreFeatures: string[];
  magicMoment: string;
  userExperienceLevel: string;
  familiarAIIDEs: string;
  selectedRepository: Repository | null;
  techStack: {
    frontendFramework: string;
    frontendStyling: string;
    backendFramework: string;
    database: string;
    deployment: string[];
  };
  architecture: {
    projectStructure: string;
    codeStyleStrictness: string;
    apiDesign: string;
    errorHandling: string;
    testingPhilosophy: string;
  };
  monetizationStrategy: string;
  generatedArtifacts: GeneratedArtifacts | null;
  selectedArtifact: keyof GeneratedArtifacts | null;
  setVibe: (vibe: string) => void;
  setAnswer: (key: keyof Omit<ProjectState, 'techStack' | 'architecture' | 'selectedRepository' | 'generatedArtifacts' | 'selectedArtifact' | 'setVibe' | 'setAnswer' | 'setTechStack' | 'setArchitecture' | 'setSelectedRepository' | 'setGeneratedArtifacts' | 'setSelectedArtifact'>, value: any) => void;
  setTechStack: (key: keyof ProjectState['techStack'], value: string | string[]) => void;
  setArchitecture: (key: keyof ProjectState['architecture'], value: string) => void;
  setSelectedRepository: (repository: Repository | null) => void;
  setGeneratedArtifacts: (artifacts: GeneratedArtifacts) => void;
  setSelectedArtifact: (artifactName: keyof GeneratedArtifacts) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      vibe: '',
      targetAudience: '',
      problemStatement: '',
      coreFeatures: [],
      magicMoment: '',
      userExperienceLevel: '',
      familiarAIIDEs: '',
      selectedRepository: null,
      techStack: {
        frontendFramework: '',
        frontendStyling: '',
        backendFramework: '',
        database: '',
        deployment: [],
      },
      architecture: {
        projectStructure: '',
        codeStyleStrictness: '',
        apiDesign: '',
        errorHandling: '',
        testingPhilosophy: '',
      },
      monetizationStrategy: '',
      generatedArtifacts: null,
      selectedArtifact: null,
      setVibe: (vibe) => set({ vibe }),
      setAnswer: (key, value) => set((state) => ({
        ...state,
        [key]: value,
      })),
      setTechStack: (key, value) => set((state) => ({
        techStack: {
          ...state.techStack,
          [key]: value,
        },
      })),
      setArchitecture: (key, value) => set((state) => ({
        architecture: {
          ...state.architecture,
          [key]: value,
        },
      })),
      setSelectedRepository: (repository) => set({ selectedRepository: repository }),
      setGeneratedArtifacts: (artifacts) => set({ generatedArtifacts: artifacts, selectedArtifact: 'prd.md' }),
      setSelectedArtifact: (artifactName) => set({ selectedArtifact: artifactName }),
    }),
    {
      name: 'vibespec-project-storage',
      partialize: (state) => ({ 
        selectedRepository: state.selectedRepository,
        generatedArtifacts: state.generatedArtifacts,
        selectedArtifact: state.selectedArtifact
      }),
    }
  )
);
