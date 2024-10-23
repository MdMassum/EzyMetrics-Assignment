import { Lead } from "../lead/lead";

export enum CampaignType {
    EMAIL = 'EMAIL',
    SOCIAL = 'SOCIAL',
    ADS = 'ADS',
}
  
export enum CampaignStatus {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    COMPLETED = 'COMPLETED',
}

    // Campaign Interface
export interface Campaign {
    id: string; // Unique identifier for the campaign
    name: string; // Name of the campaign
    type: CampaignType; // Type of campaign
    startDate: Date; // Start date of the campaign
    endDate: Date; // End date of the campaign
    budget: number; // Budget allocated for the campaign
    targetAudience: string; // Description of the target audience
    status: CampaignStatus; // Current status of the campaign
    createdAt: Date; // Timestamp when the campaign was created
    updatedAt: Date; // Timestamp when the campaign was last updated
    leads?: Lead[]; // Array of associated Leads
}