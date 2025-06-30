import { create } from 'zustand';

export interface GeneratedArtifacts {
  'prd.md': string;
  'tech_stack.md': string;
  'ai_directives.md': string;
  'schema.sql': string;
  'schema-er-diagram.md': string;
}

interface ProjectState {
  vibe: string;
  targetAudience: string;
  problemStatement: string;
  coreFeatures: string[];
  magicMoment: string;
  userExperienceLevel: string;
  familiarAIIDEs: string;
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
  setAnswer: (key: keyof Omit<ProjectState, 'techStack' | 'architecture' | 'generatedArtifacts' | 'selectedArtifact' | 'setVibe' | 'setAnswer' | 'setTechStack' | 'setArchitecture' | 'setGeneratedArtifacts' | 'setSelectedArtifact'>, value: any) => void;
  setTechStack: (key: keyof ProjectState['techStack'], value: string | string[]) => void;
  setArchitecture: (key: keyof ProjectState['architecture'], value: string) => void;
  setGeneratedArtifacts: (artifacts: GeneratedArtifacts) => void;
  setSelectedArtifact: (artifactName: keyof GeneratedArtifacts) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  vibe: '',
  targetAudience: '',
  problemStatement: '',
  coreFeatures: [],
  magicMoment: '',
  userExperienceLevel: '',
  familiarAIIDEs: '',
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
  setGeneratedArtifacts: (artifacts) => set({ generatedArtifacts: artifacts, selectedArtifact: 'prd.md' }),
  setSelectedArtifact: (artifactName) => set({ selectedArtifact: artifactName }),
}));
