import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from './reducer';
import * as fromTgroups from './tgroup.reducers';
import * as fromIndustry from './industry.reducer';
import * as fromCategory from './category.reducer';
import * as fromCreate from './create.reducer';
import * as fromCreateGrp from './createtgrp.reducer';
import * as fromlocatMaster from './locMaster.reducer';
import * as fromlocatValue from './locValue.reducer';
import * as fromgets from './getsrc.reducer';
import * as fromviewgrp from './viewgrp.reducer';
import * as fromExcllst from './getexlist.reducer';
import * as fromupdatetgset from './updatetgset.reducer';
import * as fromgetqcat from './getqcat.reducer';
import * as fromaddupdateexlist from './saveexlist.reducer';
import * as fromgetproque from './getproque.reducer';
import * as fromimporturl from './importsur.reducer';
import * as fromgetschlist from './listschin.reducer';
import * as fromchgtrggrpst from './changeTrgGrpSt.reducer';
import * as fromdeltrggrp from './deleteTrgGrp.reducer';
import * as fromdelexlist from './delexlist.reducer';
import * as fromnonlocksrc from './nonlocksrc.reducer';
import * as fromagenonlock from './agenonlock.reducer';
import * as fromgettrgexlist from './gettgexlist.reducer';
import * as fromgetprostats from './getprostats.reducer';
import * as fromupdatetgsrc from './updatetgsrc.reducer';
import * as fromexsupplier from './listexpsup.reducer';
import * as fromdashboard from './dashboard.reducer';
import * as fromgerinterlockquot from './getinterquota.reducer';
import * as fromtrggrpchstatus from './changeTrgGrpExternalSupplierStatus.reducer';
import * as fromgetSurveyLinks from './getSurveyLink.reducer';
import * as fromsavetargetgroupregion from './saveTrgGrpRegion.reducer';
import * as fromenRouting from './eneroute.reducer';
import * as fromgetsecsetting from './gettgset.reducer';
import * as fromgetregion from './getRegion.reducer';


// Project List
export interface ProjectsState {
    projects: fromProjects.ProjectState,
    tgroups: fromTgroups.TgroupState,
    industry: fromIndustry.IndustryState,
    category: fromCategory.CategoryState,
    create: fromCreate.CreateProjectState,
    delete: fromProjects.DelProjectState,
    status: fromProjects.StatusState,
    countries: fromTgroups.CountryState,
    creategrp: fromCreateGrp.CreateState,
    locmaster: fromlocatMaster.locationMaster,
    locvalue: fromlocatValue.locationValue,
    sources: fromgets.getsState,
    viewgrp: fromviewgrp.viewGState,
    excllst: fromExcllst.getexlistState
    updatetgset: fromupdatetgset.UpdateTGSetState,
    getqcat: fromgetqcat.getQcatState,
    addexlst: fromaddupdateexlist.saveexlistState
    getproque: fromgetproque.getproquestions,
    importurl: fromimporturl.importsurState,
    schedule: fromgetschlist.listschinState,
    chgtrggrpst: fromchgtrggrpst.changetggrpStatus,
    deltrggrp: fromdeltrggrp.deltggrpStatus,
    delexlist: fromdelexlist.DelExListState
    gendernonlock: fromnonlocksrc.nonlocksrcState,
    gettgexlist: fromgettrgexlist.gettgexlistState,
    getprostats: fromgetprostats.getprostatsState,
    updatetgsrc: fromupdatetgsrc.updatetgsrcState,
    exsupplier: fromexsupplier.listexpsupState,
    projectstate: fromdashboard.projectStates
    projectsummery: fromdashboard.projectSummery,
    projectTimeline: fromdashboard.projectTimeline,
    projectComTimeline: fromdashboard.projectCompleteTimeline,
    projectCostTimeline: fromdashboard.projectCostTimeline,
    activeProject: fromdashboard.myActiveProject,
    interlockquota: fromgerinterlockquot.getinterquotaState,
    changetrggrpstatus: fromtrggrpchstatus.changeTrgGrpSuppSt,
    surveylink: fromgetSurveyLinks.surveyLink,
    savetragetgroupregion: fromsavetargetgroupregion.saveTargetGroupRegion,
    agenonlock: fromagenonlock.nonlocksrcState,
    enrouting: fromenRouting.enerouteState,
    secsetting: fromgetsecsetting.gettgsetState,
    regions: fromgetregion.getRegionMaster
}

export const reducers: ActionReducerMap<ProjectsState> = {
    projects: fromProjects.reducer,
    tgroups: fromTgroups.reducer,
    industry: fromIndustry.reducer,
    category: fromCategory.reducer,
    create: fromCreate.reducer,
    delete: fromProjects.delreducer,
    status: fromProjects.statusreducer,
    countries: fromTgroups.contreducer,
    creategrp: fromCreateGrp.reducer,
    locmaster: fromlocatMaster.reducer,
    locvalue: fromlocatValue.reducer,
    sources: fromgets.reducer,
    viewgrp: fromviewgrp.reducer,
    excllst: fromExcllst.reducer,
    updatetgset: fromupdatetgset.reducer,
    getqcat: fromgetqcat.reducer,
    addexlst: fromaddupdateexlist.reducer,
    getproque: fromgetproque.reducer,
    importurl: fromimporturl.reducer,
    schedule: fromgetschlist.reducer,
    chgtrggrpst: fromchgtrggrpst.reducer,
    deltrggrp: fromdeltrggrp.reducer,
    delexlist: fromdelexlist.reducer,
    gendernonlock: fromnonlocksrc.reducer,
    gettgexlist: fromgettrgexlist.reducer,
    getprostats: fromgetprostats.reducer,
    updatetgsrc: fromupdatetgsrc.reducer,
    exsupplier: fromexsupplier.reducer,
    projectstate: fromdashboard.projectstatereducer,
    projectsummery: fromdashboard.projectsummeyreducer,
    projectTimeline: fromdashboard.projecttimelinereducer,
    projectComTimeline: fromdashboard.projectcomtimelinereducer,
    projectCostTimeline: fromdashboard.projectcosttimelinereducer,
    activeProject: fromdashboard.myactiveproreducer,
    agenonlock: fromagenonlock.reducer,
    interlockquota: fromgerinterlockquot.reducer,
    changetrggrpstatus: fromtrggrpchstatus.reducer,
    surveylink: fromgetSurveyLinks.reducer,
    savetragetgroupregion: fromsavetargetgroupregion.reducer,
    enrouting: fromenRouting.reducer,
    secsetting: fromgetsecsetting.reducer,
    regions: fromgetregion.reducer
}

export const getProjectsState = createFeatureSelector<ProjectsState>('projects');

export const getProjectState = createSelector(getProjectsState,(state: ProjectsState) => state.projects);

export const getAllProjects = createSelector(getProjectState, fromProjects.getProjects);
export const getProjectsLoaded = createSelector(getProjectState, fromProjects.getProjectsLoaded);
export const getProjectsLoading = createSelector(getProjectState, fromProjects.getProjectsLoading);


// Target Group List

export const getTgroupsState = createFeatureSelector<ProjectsState>('projects');

export const getTgroupState = createSelector(getTgroupsState, (state: ProjectsState) => state.tgroups);

export const getAllTgroups = createSelector(getTgroupState, fromTgroups.getTgroups);
export const getAllTgroupsLoaded = createSelector(getTgroupState, fromTgroups.getTgroupsLoaded);
export const getAllTgroupsLoading = createSelector(getTgroupState, fromTgroups.getTgroupsLoading);

// Get Industry

export const getIndustrysState = createFeatureSelector<ProjectsState>('projects');
export const getIndustryState = createSelector(getIndustrysState, (state: ProjectsState) => state.industry);

export const getAllIndustry = createSelector(getIndustryState, fromIndustry.getIndustry);
export const getAllIndustryLoaded = createSelector(getIndustryState, fromIndustry.getIndustryLoaded);
export const getAllIndustryLoading = createSelector(getIndustryState, fromIndustry.getIndustryLoading);

// Get Category

export const getCategorysState = createFeatureSelector<ProjectsState>('projects');

export const getCategoryState = createSelector(getCategorysState, (state: ProjectsState) => state.category);

export const getAllCategory = createSelector(getCategoryState, fromCategory.getCategory);
export const getAllCategoryLoaded = createSelector(getCategoryState, fromCategory.getCategoryLoaded);
export const getAllCategoryLoading = createSelector(getCategoryState, fromCategory.getCategoryLoading);

// Create Project

export const getCreateState = createFeatureSelector<ProjectsState>('projects');

export const getCreatesState = createSelector(getCreateState, (state: ProjectsState) => state.create);

export const CreatePro = createSelector(getCreatesState, fromCreate.createProject);
export const CreateProLoaded = createSelector(getCreatesState, fromCreate.createProjectLoaded);
export const CreateProLoading = createSelector(getCreatesState, fromCreate.createProjectLoading);

// Delete Project

export const deleteState = createFeatureSelector<ProjectsState>('projects');

export const deletesState = createSelector(deleteState, (state: ProjectsState) => state.delete);

export const DeletePro = createSelector(deletesState, fromProjects.deleteProject);
export const DeleteProLoaded = createSelector(deletesState, fromProjects.deleteProjectLoaded);
export const DeleteProLoading = createSelector(deletesState, fromProjects.deleteProjectLoading);


// Status Change Project

export const statusState = createFeatureSelector<ProjectsState>('projects');

export const statussState = createSelector(statusState, (state: ProjectsState) => state.status);

export const ProStatus = createSelector(statussState, fromProjects.projectStatus);
export const ProStatusLoaded = createSelector(statussState, fromProjects.projectStatusLoaded);
export const ProStatusLoading = createSelector(statussState, fromProjects.projectStatusLoading);

// Get Country List

export const contState = createFeatureSelector<ProjectsState>('projects');

export const contsState = createSelector(contState, (state: ProjectsState) => state.countries);

export const getCountry = createSelector(contsState, fromTgroups.getCountries);
export const getCountryLoaded = createSelector(contsState, fromTgroups.getCountriesLoaded);
export const getCountryLoading = createSelector(contsState, fromTgroups.getCountriesLoading);

// Create Target Group

export const createGrpState = createFeatureSelector<ProjectsState>('projects');

export const creategrpsState = createSelector(createGrpState, (state: ProjectsState) => state.creategrp);

export const createTgrp = createSelector(creategrpsState, fromCreateGrp.createTgroup);
export const createTgrpLoaded = createSelector(creategrpsState, fromCreateGrp.createTgroupLoaded);
export const createTgrpLoading = createSelector(creategrpsState, fromCreateGrp.createTgroupLoading);

// Get Location Master

export const locMasterState = createFeatureSelector<ProjectsState>('projects');

export const locatMastersState = createSelector(locMasterState, (state: ProjectsState) => state.locmaster);

export const locMast = createSelector(locatMastersState, fromlocatMaster.locMaster);
export const locMastLoaded = createSelector(locatMastersState, fromlocatMaster.locMasterLoaded);
export const locMastLoading = createSelector(locatMastersState, fromlocatMaster.locMasterLoading);


// Get Location Value

export const locValueState = createFeatureSelector<ProjectsState>('projects');

export const locatValuesState = createSelector(locValueState, (state: ProjectsState) => state.locvalue);

export const locValue = createSelector(locatValuesState, fromlocatValue.locValue);
export const locValueLoaded = createSelector(locatValuesState, fromlocatValue.locValueLoaded);
export const locValueLoading = createSelector(locatValuesState, fromlocatValue.locValueLoading);


// View Target Group

export const viewGrpState = createFeatureSelector<ProjectsState>('projects');

export const viewGrpsState = createSelector(viewGrpState, (state: ProjectsState) => state.viewgrp);

export const viewTgrp = createSelector(viewGrpsState, fromviewgrp.viewgrpcall);
export const viewTgrpLoaded = createSelector(viewGrpsState, fromviewgrp.viewgrpcallLoaded);
export const viewTgrpLoading = createSelector(viewGrpsState, fromviewgrp.viewgrpcallLoading);

// Get Sources

export const getSourceState = createFeatureSelector<ProjectsState>('projects');

export const getSourcesState = createSelector(getSourceState, (state: ProjectsState) => state.sources);

export const getSource = createSelector(getSourcesState, fromgets.getscall);
export const getSourceLoaded = createSelector(getSourcesState, fromgets.getscallLoaded);
export const getSourceLoading = createSelector(getSourcesState, fromgets.getscallLoading);


// Get ExclusionList

export const getExclusionState = createFeatureSelector<ProjectsState>('projects');

export const getExclusionsState = createSelector(getExclusionState, (state: ProjectsState) => state.excllst);

export const getExclList = createSelector(getExclusionsState, fromExcllst.getexlist);
export const getExclListLoaded = createSelector(getExclusionsState, fromExcllst.getexlistLoaded);
export const getExclListLoading = createSelector(getExclusionsState, fromExcllst.getexlistLoading);

// updatetgset

export const updatetgsetState = createFeatureSelector<ProjectsState>('projects');

export const updatetgsetsState = createSelector(updatetgsetState, (state: ProjectsState) => state.updatetgset);

export const updatetgset = createSelector(updatetgsetsState, fromupdatetgset.updateTgSet);
export const updatetgsetLoaded = createSelector(updatetgsetsState, fromupdatetgset.updateTgSetLoaded);
export const updatetgsetLoading = createSelector(updatetgsetsState, fromupdatetgset.updateTgSetLoading);
// Get Profile Question Category

export const qtCatState = createFeatureSelector<ProjectsState>('projects');

export const qtCatStates = createSelector(qtCatState, (state: ProjectsState) => state.getqcat);

export const qtCat = createSelector(qtCatStates, fromgetqcat.getqcat);
export const qtCatLoaded = createSelector(qtCatStates, fromgetqcat.getqcatLoaded);
export const qtCatLoading = createSelector(qtCatStates, fromgetqcat.getqcatLoading);


// add exclusion list
export const addExclusion = createFeatureSelector<ProjectsState>('projects');

export const addExclusions = createSelector(addExclusion, (state: ProjectsState) => state.addexlst);

export const addExlsion = createSelector(addExclusions, fromaddupdateexlist.saveexlist);
export const ExlsionLoaded = createSelector(addExclusions, fromaddupdateexlist.saveexlistLoaded);
export const ExlsionLoading = createSelector(addExclusions, fromaddupdateexlist.saveexlistLoading);
// Get Profile Question Category

export const getproqueState = createFeatureSelector<ProjectsState>('projects');

export const getproqueStates = createSelector(getproqueState, (state: ProjectsState) => state.getproque);

export const getproque = createSelector(getproqueStates, fromgetproque.getProQue);
export const getproqueLoaded = createSelector(getproqueStates, fromgetproque.getProQueLoaded);
export const getproqueLoading = createSelector(getproqueStates, fromgetproque.getProQueLoading);

// import survey url

// Get Profile Question Category

export const importurlstate = createFeatureSelector<ProjectsState>('projects');

export const importurlstates = createSelector(importurlstate, (state: ProjectsState) => state.importurl);

export const importurl = createSelector(importurlstates, fromimporturl.importsur);
export const importurlLoaded = createSelector(importurlstates, fromimporturl.importsurLoaded);
export const importurlLoading = createSelector(importurlstates, fromimporturl.importsurLoading);

//schdule list

export const scheduleliststate = createFeatureSelector<ProjectsState>('projects');

export const scheduleliststates = createSelector(scheduleliststate, (state: ProjectsState) => state.schedule);

export const schedulelist = createSelector(scheduleliststates, fromgetschlist.listschin);
export const schedulelistLoaded = createSelector(scheduleliststates, fromgetschlist.listschinLoaded);
export const schedulelistLoading = createSelector(scheduleliststates, fromgetschlist.listschinLoading);


// change Target group status

export const changetrggrpststatus = createFeatureSelector<ProjectsState>('projects');

export const changetrggrpststatuss = createSelector(changetrggrpststatus, (state: ProjectsState) => state.chgtrggrpst);

export const changetrggrpst = createSelector(changetrggrpststatuss, fromchgtrggrpst.chgTrgGrpSt);
export const changetrggrpstLoaded = createSelector(changetrggrpststatuss, fromchgtrggrpst.chgTrgGrpStLoaded);
export const changetrggrpstLoading = createSelector(changetrggrpststatuss, fromchgtrggrpst.chgTrgGrpStLoading);

// delete Target group status

export const deletetrggrpststatus = createFeatureSelector<ProjectsState>('projects');

export const deletetrggrpststatuss = createSelector(deletetrggrpststatus, (state: ProjectsState) => state.deltrggrp);

export const deltrggrp = createSelector(deletetrggrpststatuss, fromdeltrggrp.delTrgGrp);
export const deltrggrpstLoaded = createSelector(deletetrggrpststatuss, fromdeltrggrp.delTrgGrpStLoaded);
export const deltrggrpstLoading = createSelector(deletetrggrpststatuss, fromdeltrggrp.delTrgGrpStLoading);

// delete Exclusion List

export const deletetexlistatus = createFeatureSelector<ProjectsState>('projects');

export const deletetexlistatuss = createSelector(deletetexlistatus, (state: ProjectsState) => state.delexlist);

export const delexlist = createSelector(deletetexlistatuss, fromdelexlist.delExList);
export const delexlistLoaded = createSelector(deletetexlistatuss, fromdelexlist.delExListLoaded);
export const delexlistLoading = createSelector(deletetexlistatuss, fromdelexlist.delExListLoading);

// Get Profile Question Category

export const nonlocksrcState = createFeatureSelector<ProjectsState>('projects');

export const nonlocksrcsState = createSelector(nonlocksrcState, (state: ProjectsState) => state.gendernonlock);

export const getnonlocksrc = createSelector(nonlocksrcsState, fromnonlocksrc.nonlocksrc);
export const getnonlocksrcLoaded = createSelector(nonlocksrcsState, fromnonlocksrc.nonlocksrcLoaded);
export const getnonlocksrcLoading = createSelector(nonlocksrcsState, fromnonlocksrc.nonlocksrcLoading);

// Get target grp exclusion list
export const gettgexliststate = createFeatureSelector<ProjectsState>('projects');

export const gettgexliststates = createSelector(gettgexliststate, (state: ProjectsState) => state.gettgexlist);

export const gettgexlist = createSelector(gettgexliststates, fromgettrgexlist.gettgexlists);
export const gettgexlistLoaded = createSelector(gettgexliststates, fromgettrgexlist.gettgexlistLoaded);
export const gettgexlistLoading = createSelector(gettgexliststates, fromgettrgexlist.gettgexlistLoading);

// Get project details
export const getprostatsstate = createFeatureSelector<ProjectsState>('projects');

export const getprostatsstates = createSelector(getprostatsstate, (state: ProjectsState) => state.getprostats);

export const getprodetails = createSelector(getprostatsstates, fromgetprostats.getprostats);
export const getprodetailsLoaded = createSelector(getprostatsstates, fromgetprostats.getprostatsLoaded);
export const getprodetailsLoading = createSelector(getprostatsstates, fromgetprostats.getprostatsLoading);

// update tg src
export const updatetgsrcstate = createFeatureSelector<ProjectsState>('projects');

export const updatetgsrcsstate = createSelector(updatetgsrcstate, (state: ProjectsState) => state.updatetgsrc);

export const updatetgsrc = createSelector(updatetgsrcsstate, fromupdatetgsrc.updatetgsrc);
export const updatetgsrcLoaded = createSelector(updatetgsrcsstate, fromupdatetgsrc.updatetgsrcLoaded);
export const updatetgsrcLoading = createSelector(updatetgsrcsstate, fromupdatetgsrc.updatetgsrcLoading);

// Get target grp supplier list
export const gettgsuplierstate = createFeatureSelector<ProjectsState>('projects');

export const gettgsuplierstates = createSelector(gettgsuplierstate, (state: ProjectsState) => state.exsupplier);

export const gettgexsuplierList = createSelector(gettgsuplierstates, fromexsupplier.listexpsup);
export const gettgexsuplierListLoaded = createSelector(gettgsuplierstates, fromexsupplier.listexpsupLoaded);
export const gettgexsuplierListLoading = createSelector(gettgsuplierstates, fromexsupplier.listexpsupLoading);


// Get project states
export const projecstatasstate = createFeatureSelector<ProjectsState>('projects');

export const projecstatasstates = createSelector(projecstatasstate, (state: ProjectsState) => state.projectstate);

export const projectStates = createSelector(projecstatasstates, fromdashboard.proStat);
export const projectStateLoaded = createSelector(projecstatasstates, fromdashboard.proStatLoaded);
export const projectStateLoading = createSelector(projecstatasstates, fromdashboard.lproStatLoading);


// Get project summery
export const projecsummerysstate = createFeatureSelector<ProjectsState>('projects');

export const projecsummerysstates = createSelector(projecsummerysstate, (state: ProjectsState) => state.projectsummery);

export const projectSummery = createSelector(projecsummerysstates, fromdashboard.proSummery);
export const projectSummeryLoaded = createSelector(projecsummerysstates, fromdashboard.proSummeryLoaded);
export const projectSummeryLoading = createSelector(projecsummerysstates, fromdashboard.proSummeryLoading);


// Get project timeline
export const projecttimelinestate = createFeatureSelector<ProjectsState>('projects');

export const projecttimelinestates = createSelector(projecttimelinestate, (state: ProjectsState) => state.projectTimeline);

export const projectCom = createSelector(projecttimelinestates, fromdashboard.proTimeline);
export const projectComLoaded = createSelector(projecttimelinestates, fromdashboard.proTimelineLoaded);
export const projectComLoading = createSelector(projecttimelinestates, fromdashboard.proTimelineLoading);

// Get project complete timeline
export const projectcomplatetimelinestate = createFeatureSelector<ProjectsState>('projects');

// tslint:disable-next-line:max-line-length
export const projectcomplatetimelinestates = createSelector(projectcomplatetimelinestate, (state: ProjectsState) => state.projectComTimeline);

export const projectComTimeline = createSelector(projectcomplatetimelinestates, fromdashboard.proComTimeline);
export const projectComTimelineLoaded = createSelector(projectcomplatetimelinestates, fromdashboard.proComTimelineLoaded);
export const projectComTimelineLoading = createSelector(projectcomplatetimelinestates, fromdashboard.proComTimelineLoading);

// Get project cost timeline
export const projectcosttimelinestate = createFeatureSelector<ProjectsState>('projects');

export const projectcosttimelinestates = createSelector(projectcosttimelinestate, (state: ProjectsState) => state.projectCostTimeline);

export const projectCostTimeline = createSelector(projectcosttimelinestates, fromdashboard.proCostTimeline);
export const projectCostTimelineLoaded = createSelector(projectcosttimelinestates, fromdashboard.proCostTimelineLoaded);
export const projectCostTimelineLoading = createSelector(projectcosttimelinestates, fromdashboard.proCostTimelineLoading);


// my project
export const myProjectstate = createFeatureSelector<ProjectsState>('projects');

export const myProjectstates = createSelector(myProjectstate, (state: ProjectsState) => state.activeProject);

export const myProject = createSelector(myProjectstates, fromdashboard.myActivePro);
export const myProjectLoaded = createSelector(myProjectstates, fromdashboard.myActiveProLoaded);
export const myProjectLoading = createSelector(myProjectstates, fromdashboard.myActiveProLoading);

// Get Non Lock Age

export const agenonlocksrcState = createFeatureSelector<ProjectsState>('projects');

export const agenonlocksrcsState = createSelector(agenonlocksrcState, (state: ProjectsState) => state.agenonlock);

export const getagenonlocksrc = createSelector(agenonlocksrcsState, fromagenonlock.agenonlocksrc);
export const getagenonlocksrcLoaded = createSelector(agenonlocksrcsState, fromagenonlock.agenonlocksrcLoaded);
export const getagenonlocksrcLoading = createSelector(agenonlocksrcsState, fromagenonlock.agenonlocksrcLoading);
//get interlock quotas


// my project 
export const interlockquotastate = createFeatureSelector<ProjectsState>('projects');

export const interlockquotastates = createSelector(interlockquotastate, (state: ProjectsState) => state.interlockquota);

export const interlockquota = createSelector(interlockquotastates, fromgerinterlockquot.getinterquota);
export const interlockquotaLoaded = createSelector(interlockquotastates, fromgerinterlockquot.getinterquotaLoaded);
export const interlockquotaLoading = createSelector(interlockquotastates, fromgerinterlockquot.getinterquotaLoading);


//change target group supplier status

export const changetrgrpsuppststate = createFeatureSelector<ProjectsState>('projects');

export const changetrgrpsuppststates = createSelector(changetrgrpsuppststate, (state: ProjectsState) => state.changetrggrpstatus);

export const changetrgrpsupp = createSelector(changetrgrpsuppststates, fromtrggrpchstatus.changeTrgGrpSuppSt);
export const changetrgrpsuppLoaded = createSelector(changetrgrpsuppststates, fromtrggrpchstatus.changeTrgGrpSuppStLoaded);
export const changetrgrpsuppLoading = createSelector(changetrgrpsuppststates, fromtrggrpchstatus.changeTrgGrpSuppStLoading);


//change target group supplier status

export const getsurveylinkstate = createFeatureSelector<ProjectsState>('projects');

export const getsurveylinkstates = createSelector(getsurveylinkstate, (state: ProjectsState) => state.surveylink);

export const getslinks = createSelector(getsurveylinkstates, fromgetSurveyLinks.getSurveyLnk);
export const getslinksLoaded = createSelector(getsurveylinkstates, fromgetSurveyLinks.getSurveyLnkLoaded);
export const getslinksLoading = createSelector(getsurveylinkstates, fromgetSurveyLinks.getSurveyLnkLoading);

//change target group supplier status

export const savetrggrpregionstate = createFeatureSelector<ProjectsState>('projects');

export const savetrggrpregionstates = createSelector(savetrggrpregionstate, (state: ProjectsState) => state.savetragetgroupregion);

export const savetrgregion = createSelector(savetrggrpregionstates, fromsavetargetgroupregion.saveTrgGrpRegion);
export const savetrgregionLoaded = createSelector(savetrggrpregionstates, fromsavetargetgroupregion.saveTrgGrpRegionLoaded);
export const savetrgregionLoading = createSelector(savetrggrpregionstates, fromsavetargetgroupregion.saveTrgGrpRegionLoading);

//change target group supplier status

export const enroutestate = createFeatureSelector<ProjectsState>('projects');
export const enroutestates = createSelector(enroutestate, (state: ProjectsState) => state.enrouting);
export const enroute = createSelector(enroutestates, fromenRouting.eneroute);
export const enrouteLoaded = createSelector(enroutestates, fromenRouting.enerouteLoaded);
export const enrouteLoading = createSelector(enroutestates, fromenRouting.enerouteLoading);

//get security setting

export const secsettingstate = createFeatureSelector<ProjectsState>('projects');
export const secsettingstates = createSelector(secsettingstate, (state: ProjectsState) => state.secsetting);
export const secsetting = createSelector(secsettingstates, fromgetsecsetting.gettgset);
export const secsettingLoaded = createSelector(secsettingstates, fromgetsecsetting.gettgsetLoaded);
export const secsettingLoading = createSelector(secsettingstates, fromgetsecsetting.gettgsetLoading);

//get regions

export const getregionstate = createFeatureSelector<ProjectsState>('projects');
export const getregionstates = createSelector(getregionstate, (state: ProjectsState) => state.regions);
export const getregion = createSelector(getregionstates, fromgetregion.getRegion);
export const getregionLoaded = createSelector(getregionstates, fromgetregion.getRegionLoaded);
export const getregionLoading = createSelector(getregionstates, fromgetregion.getRegionLoading);




