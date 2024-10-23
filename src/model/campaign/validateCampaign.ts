import {z} from 'zod';

const CampaignTypeSchema = z.enum(['EMAIL', 'SOCIAL', 'ADS']);
const CampaignStatusSchema = z.enum(['ACTIVE', 'PAUSED', 'COMPLETED']);

const CampaignSchema = z.object({
    id: z.string(), // Unique identifier for the campaign
    name: z.string().min(1, "Campaign name is required"),
    type: CampaignTypeSchema,
    startDate: z.date(), // Ensure valid Date object
    endDate: z.date(), // Ensure valid Date object
    budget: z.number().positive("Budget must be a positive number"), // Validate positive budget
    targetAudience: z.string().min(1, "Target audience is required"),
    status: CampaignStatusSchema,
    createdAt: z.date(), // Ensure valid Date object
    updatedAt: z.date(), // Ensure valid Date object
    leads: z.array(z.any()).optional(), // Adjust type if necessary
  });