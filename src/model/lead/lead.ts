import { z } from 'zod';
import { Campaign } from '../campaign/campaign';

// Enums
export enum LeadStatus {
    NEW = 'NEW',
    CONTACTED = 'CONTACTED',
    QUALIFIED = 'QUALIFIED',
    UNQUALIFIED = 'UNQUALIFIED',
  }
  
  // Lead Interface
  export interface Lead {
    id: string; // Unique identifier for the lead
    firstName: string; // First name of the lead
    lastName: string; // Last name of the lead
    email: string; // Email address of the lead
    phone?: string; // Optional phone number
    company?: string; // Optional company name
    source: string; // How the lead was acquired
    status: LeadStatus; // Lead status
    createdAt: Date; // Timestamp when the lead was created
    updatedAt: Date; // Timestamp when the lead was last updated
    campaigns?: Campaign[]; // Array of associated Campaigns
  }
  

  