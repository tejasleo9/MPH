//project starts
export let listproject = 'project/list-projects';
export let deleteproject = 'project/delete-project';
export let updateprojectstatus = 'project/update-project-status';
//project ends

// create project starts
export let getresearchcategories = 'common/get-research-categories';
export let createproject = 'project/create-project';
export let updateproject = 'project/update-project-overview';
export let projectcomstats = 'project/project-completes-stats';
export let projectcostdetails = 'project/get-project-cost-details';
export let targetgrpquotastats = 'project/get-target-group-quotas-stats';
// create project ends

//dashboard starts
export let activeproject = 'project/get-project-dashboard-active-projects';
//dashboard ends

// exclusion starts
export let exclusionlist = 'project/list-exclusion-list';
export let getexamplelistfile = 'project/get-example-list-file';
export let createexclusion = 'project/create-exclusion-list';
export let deleteexclusion = 'project/delete-exclusion-list';
// exclusion ends

// scheduling starts
export let schsource = 'project/get-sources';
export let listtrggrp = 'project/list-target-groups';
export let interlockquota = 'project/get-interlock-quota';
export let listschinvities = 'project/list-scheduled-invites';
export let addexternalsupplier = 'supplier/add-external-supplier';
export let reminderschbatches = 'project/reminder-schedule-batches-by-quota';
export let schbatchesbyquota = 'project/schedule-batches-by-quota';
export let enablerouting = 'project/enable-routing-for-quota';
export let deletetrggrpsch = 'project/delete-target-group-scheduler';
export let schdetails = 'project/get-scheduler-details';
export let getschreport = 'project/get-scheduler-report';
// scheduling ends

//comman api stars
export let quotafeasibility = 'project/get-quota-feasibility';
export let updatesource = 'project/update-target-group-sources';
//comman api ends

//target exclusion starts
export let trggrpwithstatus = 'project/get_target_group_project_status';
export let savetrggrpwithstatus = 'project/save_target_group_project_status';
export let savetrggrpexlist = 'project/save-target-group-exclusion-lists';
export let responsestatus = 'project/get_response_status';
//target exclusion ends

//external supplier starts
export let listexternallist = 'supplier/list-external-supplier';
export let viewexternalsupplier = 'supplier/view-external-supplier';
export let changeexternalsupplierstatus = 'supplier/change-external-supplier-status';
export let editexternalsupplier = 'supplier/edit-external-supplier';
//external supplier ends

//target group overview start
export let viewtargetgroup = 'project/view-target-group';
export let updatetargetgroup = 'project/update-target-group-overview';
export let createtargetgroup = 'project/create-target-group';
//target group overview ends

//tg profile starts
export let getprofileqescategories = 'project/get-profile-question-categories';
export let getprofilequestions = 'project/get-profile-questions';
export let savetargetgrpquestion = 'project/save-target-group-questions';
//tg profile ends

//quota starts
export let storequota = 'project/store-quota';
export let authorizeproject = 'project/authorization_request';
export let disablerouting = 'project/disable-routing-for-quota';
//quota ends

//region starts
export let getlocationmaster ='location/get-location-master';
export let viewtargetgrpregion = 'project/view-target-group-locations';
export let getlocationvalue ='location/get-location-values';
export let savetargetgrpregioncat = 'project/save-target-group-regional-criteria';
export let updatetargetgrplocation = 'project/update-target-group-location';
//region ends

//setting link start
export let gettgsetting = 'project/get-target-group-settings';
export let updatetargetgrpsetting = 'project/update-target-group-settings';
//setting link ends

//survey links start
export let geturlcount = 'project/get-survey-url-count';
export let importsurveylink = 'project/import-survey-urls';
export let deleteurl = 'project/delete-survey-urls';
//survey links ends

// target grp starts
export let changetargetgrpstatus = 'project/update-target-group-status';
export let deletetargetgrp = 'project/delete-target-groups';
// target grp ends

export let getcountrylist = 'common/get-country-list'
export let getresearchindustrylist = 'common/get-research-industries'
export let gettargetgrpexlist = 'project/get-target-group-exclusion-lists'
export let targetgrpsch = 'project/edit-target-group-scheduler'
export let setreminder = 'supplier/set-reminder'
export let edireminder = 'supplier/edit-reminder'
export let externalsuppliertestdetails = 'supplier/get-external-supplier-test-details'
export let getrespondedstatus = 'Report/get-respondent-status'
export let respondedcountresp = 'project/get-respondent-count-resp-report'
export let getrespondedreport = 'project/get-respondent-report'
export let projectreport = 'project/get-project-report'
export let projectstat = 'project/get-project-stats'
export let deletetargetquota = 'project/delete-target-group-quotas'
export let projectcompletestats = 'project/get-project-completes-stats'
export let projectdashboardstats = 'project/get-project-dashboard-stats'
export let projectdashboardsummary = 'project/get-project-dashboard-summary'
export let projectdashboardtimline = 'project/get-project-dashboard-timeline'
export let projectdashboardcompletestimeline = 'project/get-project-dashboard-completes-timeline'
export let projectdashboardcosttimeline = 'project/get-project-dashboard-cost-timeline'
export let projectdashboardactiveproject = 'project/get-project-dashboard-active-projects'