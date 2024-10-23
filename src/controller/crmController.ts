import { Request, Response } from 'express';
import prisma from '../prisma';

export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await prisma.lead.findMany();
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
};

export const createLead = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, phone, company, source, status } = req.body;
  try {
    const newLead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        source,
        status,
      },
    });
    res.status(201).json(newLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (lead) {
      res.status(200).json(lead);
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  } catch (error) {
    console.error('Error fetching lead by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve lead' });
  }
};

export const updateLead = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, company, source, status } = req.body;
  try {
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { firstName, lastName, email, phone, company, source, status },
    });
    res.status(200).json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
};


export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.lead.delete({ where: { id } });
    res.status(204).send(); // No content on successful delete
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
};
