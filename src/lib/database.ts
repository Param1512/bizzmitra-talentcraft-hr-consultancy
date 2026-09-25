import { supabase, SUPABASE_URL } from './supabase';

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Intake' | 'In Progress' | 'Review' | 'Completed';
  assignee: string;
  impactScore: number;
  slaDays: number;
  createdAt: string;
}

const STORAGE_KEY = 'bizzmitra-talentcraft-hr-consultancy_db_records_v1';

const SEED_DATA: WorkItem[] = [
  {
    id: 'WO-101',
    title: 'Automated Client Onboarding & KYC Pipeline',
    category: 'Digital Operations',
    priority: 'Critical',
    status: 'In Progress',
    assignee: 'Aarav Sharma (Lead)',
    impactScore: 96,
    slaDays: 2,
    createdAt: '2026-09-24',
  },
  {
    id: 'WO-102',
    title: 'Multi-Tenant Document Verification Gateway',
    category: 'Compliance & Governance',
    priority: 'High',
    status: 'Review',
    assignee: 'Priya Iyer (Security)',
    impactScore: 92,
    slaDays: 1,
    createdAt: '2026-09-23',
  },
  {
    id: 'WO-103',
    title: 'Real-Time Telemetry & SLA Breach Predictor',
    category: 'Analytics & AI',
    priority: 'High',
    status: 'Completed',
    assignee: 'Sneha Kulkarni (ML)',
    impactScore: 98,
    slaDays: 0,
    createdAt: '2026-09-22',
  },
  {
    id: 'WO-104',
    title: 'Executive KPI Reporting & ROI Aggregator',
    category: 'Transformation',
    priority: 'Medium',
    status: 'Intake',
    assignee: 'Rohan Deshmukh (Product)',
    impactScore: 89,
    slaDays: 4,
    createdAt: '2026-09-25',
  },
  {
    id: 'WO-105',
    title: 'Automated Billing & Stakeholder Settlement Node',
    category: 'Finance Integration',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Vikram Mehta (Architect)',
    impactScore: 94,
    slaDays: 3,
    createdAt: '2026-09-24',
  },
];

export async function fetchDatabaseRecords(): Promise<WorkItem[]> {
  try {
    // Attempt to load from localStorage cache first
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Database cache read error', e);
  }
  return SEED_DATA;
}

export async function persistRecord(item: WorkItem, existingRecords: WorkItem[]): Promise<WorkItem[]> {
  const updated = [item, ...existingRecords];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist record', e);
  }
  return updated;
}

export async function updateRecordStatus(id: string, status: WorkItem['status'], records: WorkItem[]): Promise<WorkItem[]> {
  const updated = records.map(r => r.id === id ? { ...r, status } : r);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update record in DB', e);
  }
  return updated;
}

export async function deleteRecord(id: string, records: WorkItem[]): Promise<WorkItem[]> {
  const updated = records.filter(r => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete record from DB', e);
  }
  return updated;
}
