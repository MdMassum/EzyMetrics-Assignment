import { Request, Response } from 'express';
import PDFDocument from 'pdfkit'
import { Parser } from 'json2csv';
import prisma from '../../prisma';


export const generateLeadsReportPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await prisma.lead.findMany();

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="leads_report.pdf"');

    doc.text('Leads Report', { align: 'center' });
    doc.moveDown();

    leads.forEach((lead) => {
      doc.text(`Lead: ${lead.firstName} ${lead.lastName} | Email: ${lead.email}`);
      doc.moveDown();
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ error: 'Failed to generate PDF report' });
  }
};

export const generateCampaignsReportCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await prisma.campaign.findMany();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(campaigns);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="campaigns_report.csv"');
    res.status(200).end(csv);
  } catch (error) {
    console.error('Error generating CSV report:', error);
    res.status(500).json({ error: 'Failed to generate CSV report' });
  }
};

export const sendCampaignAlert = async (req: Request, res: Response): Promise<void> => {
  const { campaignId, newStatus } = req.body;
  try {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: newStatus },
    });

    console.log(`Alert: Campaign ${campaign.name} has changed to ${newStatus}`);
    res.status(200).json({ message: `Alert sent for campaign: ${campaign.name}` });
  } catch (error) {
    console.error('Error sending campaign alert:', error);
    res.status(500).json({ error: 'Failed to send alert' });
  }
};
