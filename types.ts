
export type UserProfile = 'Emprendedor' | 'Inversor' | 'Asesor';

export interface Project {
  id: string;
  title: string;
  creator: string;
  description: string;
  category: string;
  goal: number;
  raised: number;
  investors: number;
  image: string;
  status: 'active' | 'funded' | 'completed';
  minInvestment: number;
  daysLeft: number;
  valuation: number;
  returnEstimate: string;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
  milestones: { label: string; amount: number; completed: boolean }[];
  team: { name: string; role: string; img: string }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NodePoint {
  id: string;
  lat: number;
  lng: number;
  type: UserProfile;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: 'social' | 'meeting' | 'service';
}
