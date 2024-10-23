import express from 'express';
import { getLeads, createLead, getLeadById, updateLead, deleteLead } from './controller/crmController';
import { getCampaigns, createCampaign, getCampaignById, updateCampaign, deleteCampaign } from './controller/marketingController';
import { generateLeadsReportPDF, generateCampaignsReportCSV, sendCampaignAlert } from './controller/reportController';

const router = express.Router();

// CRM Routes
router.get('/leads', getLeads);
router.get('/leads/:id', getLeadById);
router.post('/leads', createLead);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

// Marketing Campaign Routes
router.get('/campaigns', getCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.post('/campaigns', createCampaign);
router.put('/campaigns/:id', updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);

// Report Generation and Alerts
router.get('/reports/leads/pdf', generateLeadsReportPDF);
router.get('/reports/campaigns/csv', generateCampaignsReportCSV);
router.post('/alerts/campaign', sendCampaignAlert);

export default router;
