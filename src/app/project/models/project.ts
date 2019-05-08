export interface Project {
  id: number;
  name: string;
  start_date: string;
  completes_required: number;
  completes: string;
  company_id: number;
  status: number;
  first_page_url: string;
  from: number;
  last_page: 1;
  last_page_url: string;
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number;
  total: number;
}

export interface TGroups {
  id: number;
  name: string;
  status: number;
  project_id: number;
  estimated_loi: number;
  estimated_ir: number;
  start_date: string;
  created_at: string;
  country: string;
  completes: string;
  screenouts: string;
  actual_loi: number;
  actual_ir: number;
}

export interface Country {
  id: number;
  name: string;
  short_code: string;
}

export interface Industry {
  id: number;
  industry_name: string;
  status: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface CreatePro {
  name: string;
  research_category_id: string;
  research_industry_id: string;
  company_id: string;
  end_page_url_type: number;
  created_by: string;
  created_at: string;
  id: number;
}

export interface DelPro {
  message: string;
}

export interface StatusPro {
  message: string;
}

export interface CreateTgrp {
  name: string;
  country_id: number;
  estimated_ir: number;
  estimated_loi: number;
  completes_required: number;
  min_age: number;
  max_age: number;
  gender: number;
  project_id: number;
}

export interface getLocMaster {
  id: number;
  name: string;
}

export interface GetSource {
  name: string;
  country_id: number;
  estimated_ir: number;
  estimated_loi: number;
  completes_required: number;
  min_age: number;
  max_age: number;
  gender: number;
  project_id: number;
}

export interface ViewTargetGroup {
  target_group_id: number;
  name: string;
  estimated_ir: number;
  estimated_loi: number;
  actual_ir: number;
  actual_loi: number;
  completes_required: number;
  project_id: number;
  min_age: number;
  max_age: number;
  sources: [''];
}

export interface getLocValue {
  id: number;
  name: string;
}

export interface getExlList {
  id: number;
  name: string;
  pulled_panelists_count: number;
  panel_id: number;
  created_at: string;
}

export interface getFeasibility {
  category_id: number;
  category_name: string;
  sort_order: number;
  number_of_questions: string;
}

export interface getQuestion {
  is_selected: number;
  question_id: number;
  question_text: number;
  question_sort_order: number;
  variables: [""];
}

export interface getQuotaFeasibility {
  source: number;
  panel_id: number;
  feasible_completes: number;
  company_id: number;
  response_rate: number;
  CPI: number;
}

export interface saveTargetGrpQuestions {
  message: string;
}

export interface getExpListFile {
  file: string;
}

export interface createExclusionList {
  name: string;
  panel_id: string;
  filter_criteria;
  count: number;
  created_by: number;
  created_at: string;
  id: number;
}

export interface exclusionList {
  id: number;
  name: string;
  pulled_panelists_count: number;
  panel_id: number;
  created_at: string;
}

export interface deleteExclusionList {
  message: string;
}

export interface getQuotaFeasibilityOnExclusionList {
  text: string;
  cond: [""];
  feasible: string;
}

export interface saveTargetGrpExclusionList {
  message: string;
}

export interface getTargetGrpExclusionList {
  message: string;
}

export interface schBatchesByQuota {
  message: string;
}

export interface editTargetGroupScheduler {
  message: string;
}

export interface editTargetGroupScheduler {
  message: string;
}

export interface listSchInvities {
  scheduler_id: number;
  quota_id: number;
  batch_id: number;
  name: string;
  pulled_sample: number;
  scheduled_at: string;
  status: string;
}

export interface setReminder {
  message: string;
}

export interface editReminder {
  message: string;
}

export interface addExternalSupplier {
  supplier_name: string;
  complete_url: string;
  quotaful_url: string;
  screenout_url: string;
  tracking_type: string;
  tracking_method: string;
  parameters: string;
  tracking_url: string;
  created_at;
}

export interface viewExternalSupplier {
  id: string;
  name: string;
  quotas: [""];
  complete_url: string;
  quotafull_url: string;
  screenout_url: string;
  tracking_type: string;
  tracking_method: string;
  parameters: string;
  tracking_url: string;
  created_at;
}
export interface updateSecure {
  target_group_id: number,
  is_tablet_accessible: number,
  is_mobile_accessible: number,
  is_desktop_accessible: number,
  is_multi_attempt_enabled: number,
  is_geo_ip_enabled: number,
  is_ip_duplication_enabled: number,
  is_global_supplier_allowed: number
}

export interface externalSupplier {
  target_group_id: number,
  quotas,
  name: string,
  complete_url: string,
  quotaful_url: string,
  screenout_url: string,
  tracking_type: number,
  tracking_method: string,
  parameters: string,
  tracking_url: string
}


