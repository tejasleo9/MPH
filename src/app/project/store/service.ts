import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  Project,
  TGroups,
  Industry,
  Category,
  CreatePro,
  DelPro,
  StatusPro,
  Country,
  CreateTgrp,
  GetSource,
  ViewTargetGroup,
  getLocMaster,
  getLocValue,
  getFeasibility,
  viewExternalSupplier,
  addExternalSupplier,
  editReminder,
  setReminder,
  listSchInvities,
  getExlList,
} from "../models/project";

@Injectable()
export class ProService {
  private BASE_URL = "http://m4-live.mysurveyhub.com/v1/";

  constructor(private http: HttpClient) { }

  getCountry(): Observable<any> {
    const url = `${this.BASE_URL}common/get-country-list`;
    return this.http.get<Country>(url);
  }

  getIndustry(): Observable<any> {
    const url = `${this.BASE_URL}common/get-research-industries`;
    return this.http.get<Industry>(url);
  }

  getCategory(obj): Observable<any> {
    const url = `${this.BASE_URL}common/get-research-categories`;
    return this.http.post<Category>(url, obj);
  }

  getList(paraObj): Observable<any> {
    const url = `${this.BASE_URL}project/list-projects`;
    return this.http.post<Project>(url, paraObj);
  }

  getTgroupList(obj): Observable<any> {
    const url = `${this.BASE_URL}project/list-target-groups`;
    return this.http.post<TGroups>(url, obj);
  }

  createProject(obj): Observable<any> {
    const url = `${this.BASE_URL}project/create-project`;
    return this.http.post<CreatePro>(url, obj);
  }

  updateProject(obj): Observable<any> {
    const url = `${this.BASE_URL}project/update-project-overview`;
    return this.http.post<CreatePro>(url, obj);
  }

  deleteProject(obj): Observable<any> {
    const url = `${this.BASE_URL}project/delete-project`;
    return this.http.post<DelPro>(url, obj);
  }

  statusProject(obj): Observable<any> {
    const url = `${this.BASE_URL}project/update-project-status`;
    return this.http.post<any>(url, obj);
  }

  createTgroup(obj): Observable<any> {
    const url = `${this.BASE_URL}project/create-target-group`;
    return this.http.post<CreateTgrp>(url, obj);
  }

  locatMaster(obj): Observable<any> {
    const url = `${this.BASE_URL}location/get-location-master`;
    return this.http.post<getLocMaster>(url, obj);
  }

  locatValue(obj): Observable<any> {
    const url = `${this.BASE_URL}location/get-location-values`;
    return this.http.post<getLocValue>(url, obj);
  }

  getSource(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-quota-feasibility`;
    return this.http.post<GetSource>(url, obj);
  }

  viewTargetGroup(obj): Observable<any> {
    const url = `${this.BASE_URL}project/view-target-group`;
    return this.http.post<ViewTargetGroup>(url, obj);
  }

  //---------
  getQuestionCat(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-profile-question-categories`;
    return this.http.post<any>(url, obj);
  }

  getQuestion(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-profile-questions`;
    return this.http.post<getFeasibility>(url, obj);
  }



  getFeasibilityOnQuestion(
    country_id: number,
    estimated_ir: number,
    estimated_loi: number,
    completes_required: number,
    min_age: number,
    max_age: number,
    gender: number,
    questions,
    project_id: number
  ): Observable<any> {
    const url = `${this.BASE_URL}project/get-quota-feasibility`;
    return this.http.post<getFeasibility>(url, {
      country_id,
      estimated_ir,
      estimated_loi,
      completes_required,
      min_age,
      max_age,
      gender,
      questions,
      project_id
    });
  }

  saveOrUpdateTrgWithVariables(obj): Observable<any> {
    const url = `${this.BASE_URL}project/save-target-group-questions`;
    return this.http.post<getFeasibility>(url, obj);
  }

  getExlusionListOnExampleFile(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-example-list-file`;
    return this.http.post<getFeasibility>(url, obj);
  }

  addExclusionList(obj): Observable<any> {
    const url = `${this.BASE_URL}project/create-exclusion-list`;
    return this.http.post<getFeasibility>(url, obj);
  }

  getExlusionList(obj): Observable<any> {
    const url = `${this.BASE_URL}project/list-exclusion-list`;
    // console.log(url);
    return this.http.post<getExlList>(url, obj);
  }

  deleteExclusionList(obj): Observable<any> {
    const url = `${this.BASE_URL}project/delete-exclusion-list`;
    return this.http.post<getFeasibility>(url, obj);
  }

  getFeasibilityOnExclusionList(
    target_group_id: number,
    exclusion_list: number
  ): Observable<any> {
    const url = `${this.BASE_URL}project/get-quota-feasibility`;
    return this.http.post<getFeasibility>(url, {
      target_group_id,
      exclusion_list
    });
  }

  addOrUpdateTgExclusionList(reqObj): Observable<any> {
    const url = `${this.BASE_URL}project/save-target-group-exclusion-lists`;
    return this.http.post<any>(url, reqObj);
  }

  getTgExclusionList(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-target-group-exclusion-lists`;
    return this.http.post<any>(url, obj);
  }

  getSchTargetGrpBatchs(obj): Observable<any> {
    const url = `${this.BASE_URL}project/schedule-batches-by-quota`;
    return this.http.post<any>(url, obj);
  }

  setReminderTargetGrpBatchs(obj): Observable<any> {
    const url = `${this.BASE_URL}project/reminder-schedule-batches-by-quota`;
    return this.http.post<any>(url, obj);
  }

  deleteTargetGrpBatchs(obj): Observable<any> {
    const url = `${this.BASE_URL}project/delete-target-group-scheduler`;
    return this.http.post<any>(url, obj);
  }

  updateTrgGrpBatches(
    scheduled_at,
    is_now: number,
    target_group_id: number,
    target_group_batch_scheduler_id: number
  ): Observable<any> {
    const url = `${this.BASE_URL}project/edit-target-group-scheduler`;
    return this.http.post<getFeasibility>(url, {
      scheduled_at,
      is_now,
      target_group_id,
      target_group_batch_scheduler_id
    });
  }

  getSchInvites(obj): Observable<any> {
    const url = `${this.BASE_URL}project/list-scheduled-invites`;
    return this.http.post<listSchInvities>(url, obj);
  }

  setReminderForBatches(
    target_group_batch_scheduler_id,
    taget_group_id: number,
    scheduled_at,
    is_now: number,
    no_of_schedule: number
  ): Observable<any> {
    const url = `${this.BASE_URL}supplier/set-reminder`;
    return this.http.post<setReminder>(url, {
      target_group_batch_scheduler_id,
      taget_group_id,
      scheduled_at,
      is_now,
      no_of_schedule
    });
  }

  // editReminderForBatches(
  //   target_group_batch_scheduler_id,
  //   taget_group_id: number,
  //   scheduled_at,
  //   is_now: number,
  //   ): Observable<any> {
  //   const url = `${this.BASE_URL}supplier/edit-reminder`;
  //   return this.http.post<editReminder>(url, {target_group_batch_scheduler_id , taget_group_id, scheduled_at, is_now });
  // }

  // deleteReminderForBatches(
  //   target_group_batch_scheduler_id,
  //   taget_group_id: number,
  //   scheduled_at,
  //   is_now: number,
  //   ): Observable<any> {
  //   const url = `${this.BASE_URL}supplier/edit-reminder`;
  //   return this.http.post<getFeasibility>(url, {target_group_batch_scheduler_id , taget_group_id, scheduled_at, is_now });
  // }

  addExternalSupplier(obj): Observable<any> {
    const url = `${this.BASE_URL}supplier/add-external-supplier`;
    return this.http.post<addExternalSupplier>(url, obj);
  }

  viewExtrnalSupplierDtl(obj): Observable<any> {
    const url = `${this.BASE_URL}supplier/view-external-supplier`;
    return this.http.post<viewExternalSupplier>(url, obj);
  }

  editExternalSupplier(obj): Observable<any> {
    const url = `${this.BASE_URL}supplier/edit-external-supplier`;
    return this.http.post<any>(url, obj);
  }

  getTargetGrpExternalSuppliers(obj): Observable<any> {
    const url = `${this.BASE_URL}supplier/list-external-supplier`;
    return this.http.post<any>(url, obj);
  }

  changeTargetGrpExternalSupplierStatus(obj): Observable<any> {
    const url = `${this.BASE_URL}supplier/change-external-supplier-status`;
    return this.http.post<any>(url, obj);
  }

  getSupplierTestData(id: number): Observable<any> {
    const url = `${this.BASE_URL}supplier/get-external-supplier-test-details`;
    return this.http.post<any>(url, { id });
  }

  getResStatusList(): Observable<any> {
    const url = `${this.BASE_URL}project/get_response_status`;
    return this.http.post<any>(url, {});
  }

  updateStatusForProject(obj): Observable<any> {
    const url = `${this.BASE_URL}project/save_target_group_project_status`;
    return this.http.post<any>(url, obj);
  }

  getListOfProjectsStatus(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get_target_group_project_status`;
    return this.http.post<any>(url, obj);
  }

  getQuotaFeasibility(
    obj
  ): Observable<any> {
    const url = `${this.BASE_URL}project/get-quota-feasibility`;
    return this.http.post<any>(url, obj);
  }


  storeQuota(target_group_id: number, quota): Observable<any> {
    const url = `${this.BASE_URL}project/store-quota`;
    return this.http.post<any>(url, { target_group_id, quota });
  }

  storeQuotaAll(obj): Observable<any> {
    const url = `${this.BASE_URL}project/store-quota`;
    return this.http.post<any>(url, obj);
  }

  updateTargetGrpQuota(
    target_group_id: number,
    quota,
    is_update_quota: number
  ): Observable<any> {
    const url = `${this.BASE_URL}project/store-quota`;
    return this.http.post<any>(url, {
      target_group_id,
      quota,
      is_update_quota
    });
  }

  getQuotasDetails(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-interlock-quota`;
    // console.log(obj);
    return this.http.post<any>(url, obj);
  }

  setRouting(obj): Observable<any> {
    const url = `${this.BASE_URL}project/enable-routing-for-quota`;
    return this.http.post<any>(url, obj);
  }

  disableRoutingQuota(target_group_id: number, quotas): Observable<any> {
    const url = `${this.BASE_URL}project/disable-routing-for-quota`;
    return this.http.post<any>(url, { target_group_id, quotas });
  }

  saveTargetGrpSetting(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-target-group-settings`;
    return this.http.post<any>(url, obj);
  }

  updateTargetGrpSetting(obj): Observable<any> {
    const url = `${this.BASE_URL}project/update-target-group-settings`;
    return this.http.post<any>(url, obj);
  }

  importSurveyLinks(obj): Observable<any> {
    const url = `${this.BASE_URL}project/import-survey-urls`;
    return this.http.post<any>(url, obj);
  }

  deleteSurveyLinks(target_group_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/enable-routing-for-quota`;
    return this.http.post<any>(url, { target_group_id });
  }

  getRespondentStatus(): Observable<any> {
    const url = `${this.BASE_URL}Report/get-respondent-status`;
    return this.http.post<any>(url, {});
  }

  getCountRespondentReport(projects, respondent_status): Observable<any> {
    const url = `${this.BASE_URL}project/get-respondent-count-resp-report`;
    return this.http.post<any>(url, { projects, respondent_status });
  }

  getRespondentReport(projects, respondent_status): Observable<any> {
    const url = `${this.BASE_URL}project/get-respondent-report`;
    return this.http.post<any>(url, { projects, respondent_status });
  }

  showRespondentReportFiles(): Observable<any> {
    const url = `${this.BASE_URL}project/get-respondent-report`;
    return this.http.post<any>(url, {});
  }

  getProjectReport(projects, panel_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-report`;
    return this.http.post<any>(url, { projects, panel_id });
  }

  getProjectStates(project_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-stats`;
    return this.http.post<any>(url, { project_id });
  }

  getProjctCostDetails(project_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-cost-details`;
    return this.http.post<any>(url, { project_id });
  }

  deleteTargetGrpQuotas(target_group_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/delete-target-group-quotas`;
    return this.http.post<any>(url, { target_group_id });
  }

  getProjectCompleteStats(project_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-completes-stats`;
    return this.http.post<any>(url, { project_id });
  }

  getTargetGrpQuotasStats(project_id: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-target-group-quotas-stats`;
    return this.http.post<any>(url, { project_id });
  }

  getProjectDashboardStats(from_date, to_date): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-stats`;
    return this.http.post<any>(url, { from_date, to_date });
  }

  changeTargetGrpStatus(obj): Observable<any> {
    const url = `${this.BASE_URL}project/update-target-group-status`;
    return this.http.post<any>(url, obj);
  }

  deleteTargetGrp(obj): Observable<any> {
    const url = `${this.BASE_URL}project/delete-target-groups`;
    return this.http.post<any>(url, obj);
  }

  getNonLockFeasibility(target_group_id: number, source_id: number, quota: any): Observable<any> {
    const url = `${this.BASE_URL}project/get-quota-feasibility`;
    return this.http.post<any>(url, { target_group_id, source_id, quota });
  }

  saveTGSources(obj): Observable<any> {
    const url = `${this.BASE_URL}project/update-target-group-sources`;
    return this.http.post<any>(url, obj);
  }

  //dashboard

  getDashboardState(from_date: string, to_date: string): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-stats`;
    return this.http.post<any>(url, { from_date, to_date });
  }

  getDashboardProjectSummery(from_date: number, to_date: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-summary`;
    return this.http.post<any>(url, { from_date, to_date });
  }

  getDashboardProjectTimeline(from_date: number, to_date: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-timeline`;
    return this.http.post<any>(url, { from_date, to_date });
  }

  getDashboardProjectCompletesTimeline(from_date: number, to_date: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-completes-timeline`;
    return this.http.post<any>(url, { from_date, to_date });
  }

  getDashboardProjectCostTimeline(from_date: number, to_date: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-cost-timeline`;
    return this.http.post<any>(url, { from_date, to_date });
  }

  getDashboardMyActiveProject(from_date: number, to_date: number): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-active-projects`;
    return this.http.post<any>(url, { from_date, to_date });
  }


  getSurveyLink(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-survey-url-count`;
    return this.http.post<any>(url, obj);
  }

  saveRegionalData(obj): Observable<any> {
    const url = `${this.BASE_URL}project/save-target-group-regional-criteria`;
    return this.http.post<any>(url, obj);
  }

  updateTgroup(data): Observable<any> {
    const url = `${this.BASE_URL}project/update-target-group-overview`;
    return this.http.post<CreateTgrp>(url, data);
  }

  deleteSurveyLink(target_group_id): Observable<any> {
    const url = `${this.BASE_URL}project/delete-survey-urls`;
    return this.http.post<any>(url, target_group_id);
  }

  getRegionData(obj): Observable<any> {
    const url = `${this.BASE_URL}project/view-target-group-locations`;
    return this.http.post<any>(url, obj);
  }

  getSources(target_group_id): Observable<any> {
    const url = `${this.BASE_URL}project/get-sources`;
    return this.http.post<any>(url, target_group_id);
  }

  updateRegion(obj): Observable<any> {
    const url = `${this.BASE_URL}project/update-target-group-location`;
    return this.http.post<any>(url, obj);
  }

  getPricingTable(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-cost-details`;
    return this.http.post<any>(url, obj);
  }

  getProjStats(obj): Observable<any> {
    const url = `${this.BASE_URL}project/project-completes-stats`;
    return this.http.post<any>(url, obj);
  }

  getTgQuotas(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-target-group-quotas-stats`;
    return this.http.post<any>(url, obj);
  }

  getStats(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-scheduler-details`;
    return this.http.post<any>(url, obj);
  }


  authorizedProject(obj): Observable<any> {
    const url = `${this.BASE_URL}project/authorization_request`;
    return this.http.post<any>(url, obj);
  }

  getSchReport(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-scheduler-report`;
    return this.http.post<any>(url, obj);
  }

  getProjectStats(obj): Observable<any> {
    const url = `${this.BASE_URL}project/get-project-dashboard-active-projects`;
    return this.http.post<any>(url, obj);
  }

  disAbleRouting(obj): Observable<any> {
    const url = `${this.BASE_URL}project/disable-routing-for-quota`;
    return this.http.post<any>(url, obj);
  }
  // getGlobalQuestion(obj): Observable<any> {
  //   const url = `${this.BASE_URL}question/get-country-specific-global-questions`;
  //   return this.http.post<any>(url, obj);
  // }

  // getPanelQuestion(panel_id): Observable<any> {
  //   const url = `${this.BASE_URL}question/list-panel-question?panel_id=${panel_id}`;
  //   return this.http.post<any>(url, panel_id);
  // }


}
