export type DecisionType = 'bigTech' | 'alternative' | 'hybrid';

export type Decision = {
  id: string;
  label: string;
  description: string;
  type: DecisionType;
  feedback: string;
  icon?: string;
  cost?: string;
  scores: {
    environment: number; // 0-100
    economic: number; // 0-100
    protection: number; // 0-100
  };
};

export type Situation = {
  id: string;
  title: string;
  context: string;
  decisions: Decision[];
};

export type UserChoice = {
  situationId: string;
  decisionId: string;
  decision: Decision;
};

