import { ProjectEffects } from "./effects";
import { TgroupEffects } from "./tgroup.effects";
import { IndustryEffects } from "./industry.effects";
import { CreateTgrpEffects } from "./createtgrp.effects";
import { locMastEffects } from "./locMaster.effects";
import { getsEffects } from "./getsrc.effects";
import { viewgrpEffects } from "./viewgrp.effects";
import { locValEffects } from "./locValue.effects";
import { getExclListEffects } from "./getExlusionList.effects";
import { updTrgGrpSettingEffects } from "./updateTargetGrpSetting.effects";
import { addOrUpdateTgExclListEffects } from "./addOrUpdateTgExclusionList.effects";
import { getTgExclListEffects } from "./getTgExclusionList.effects";
import { impSurveyLinksEffects } from "./importSurveyLinks.effects";
import { getSchInvEffects } from "./getSchInvites.effects";
import { changeTrgGrpStEffets } from "./changeTargetGrpSt.effects";
import { delTrgGrpStEffets } from "./delTrgGrp.effects";
import { deleteExclListEffects } from "./deleteExclusionList.effects";
import { getnonlockfeaEffects } from "./getnonlockfea.effects";
import { getTrgGrpExtlSupEffects } from "./getTargetGrpExternalSuppliers.effects";
import { getPrjStatesEffects } from "./getProjectStates.effects";
import { getQtCatEffects } from "./getquestioncat.effects";
import { updateTgGrpSrcEffects } from "./updatetgsrc.effects";
import { getDashboardEffect } from "./dashboard.effects";
import { getagenonlockEffects } from "./getagenonlock.effects";
import { getQutDetEffects } from "./getQuotasDetails.effects";
import { chgTrgGrpExtSupStatusEffects } from "./changeTargetGrpExternalSupplierStatus.effects";
import { getSurveyLnks } from "./getSurveyLink.effects";
import { saveTrgRegionEffects } from "./savetargetgrpregion.effects";
import { getQtEffects } from "./getquestion.effects";
import { setRoutngEffects } from "./setRouting.effects";
import { getTrgGrpSettingEffects } from "./saveTargetGrpSetting.effects";
import { getRegionsEffects } from "./getRegion.effects";


export const effects: any[] = [
  ProjectEffects,
  TgroupEffects,
  IndustryEffects,
  CreateTgrpEffects,
  locMastEffects,
  getsEffects,
  viewgrpEffects,
  locValEffects,
  getExclListEffects,
  updTrgGrpSettingEffects,
  addOrUpdateTgExclListEffects,
  getTgExclListEffects,
  impSurveyLinksEffects,
  getSchInvEffects,
  changeTrgGrpStEffets,
  delTrgGrpStEffets,
  deleteExclListEffects,
  getnonlockfeaEffects,
  getTrgGrpExtlSupEffects,
  getPrjStatesEffects,
  getQtCatEffects,
  updateTgGrpSrcEffects,
  getDashboardEffect,
  getagenonlockEffects,
  getQutDetEffects,
  chgTrgGrpExtSupStatusEffects,
  getSurveyLnks,
  saveTrgRegionEffects,
  getQtEffects,
  setRoutngEffects,
  getTrgGrpSettingEffects,
  getRegionsEffects
];

export * from "./effects";
export * from "./tgroup.effects";
export * from "./industry.effects";
export * from "./createtgrp.effects";
export * from "./locMaster.effects";
export * from "./getsrc.effects";
export * from "./viewgrp.effects";
export * from "./locValue.effects";
export * from "./getTgExclusionList.effects";
export * from "./updateTargetGrpSetting.effects";
export * from "./addOrUpdateTgExclusionList.effects";
export * from "./importSurveyLinks.effects";
export * from "./getSchInvites.effects";
export * from "./changeTargetGrpSt.effects";
export * from "./delTrgGrp.effects";
export * from "./deleteExclusionList.effects";
export * from "./getnonlockfea.effects";
export * from "./getTargetGrpExternalSuppliers.effects";
export * from "./getProjectStates.effects";
export * from "./getquestioncat.effects";
export * from "./updatetgsrc.effects";
export * from "./dashboard.effects";
export * from "./getagenonlock.effects";
export * from "./getQuotasDetails.effects";
export * from "./changeTargetGrpExternalSupplierStatus.effects";
export * from "./getSurveyLink.effects";
export * from "./savetargetgrpregion.effects";
export * from "./getquestion.effects";
export * from "./setRouting.effects";
export * from "./saveTargetGrpSetting.effects";
export * from "./getRegion.effects";