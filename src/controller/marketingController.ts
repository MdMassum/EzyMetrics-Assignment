import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all campaigns
export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await prisma.campaign.findMany();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to retrieve campaigns' });
  }
};

// Create a new campaign
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  const { name, type, startDate, endDate, budget, targetAudience, status } = req.body;
  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        type,
        startDate,
        endDate,
        budget,
        targetAudience,
        status,
      },
    });
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

// Get a single campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: 'Campaign not found' });
    }
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve campaign' });
  }
};

// Update a campaign by ID
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, type, startDate, endDate, budget, targetAudience, status } = req.body;
  try {
    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: { name, type, startDate, endDate, budget, targetAudience, status },
    });
    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

// Delete a campaign by ID
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.campaign.delete({ where: { id } });
    res.status(204).send(); // No content on successful delete
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};
