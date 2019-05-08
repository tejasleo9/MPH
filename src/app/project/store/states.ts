import { Project, TGroups, Industry, CreatePro } from '../models/project';
import * as proj from './reducers';
import * as del from './reducers/reducer';
import * as stat from './reducers/reducer';
import * as tgrp from './reducers/tgroup.reducers';
import * as ind from './reducers/industry.reducer';
import * as cat from './reducers/category.reducer';
import * as cpro from './reducers/create.reducer';
import * as cgrp from './reducers/createtgrp.reducer';
import * as lMaster from './reducers/locMaster.reducer';
import * as lValue from './reducers/locValue.reducer';
import * as gets from './reducers/getsrc.reducer';
import * as fromviewgrp from './reducers/viewgrp.reducer';
import * as fromgetfeasibility from './reducers/getfeasibility.reducer';
import * as fromaddextsup from './reducers/addextsup.reducer';
import * as fromcrexlist from './reducers/crexlist.reducer';
import * as fromdelexlist from './reducers/delexlist.reducer';
import * as fromdelsurlink from './reducers/delsurlink.reducer';
import * as fromdeltgquota from './reducers/deltgquota.reducer';
import * as fromdisroute from './reducers/disroute.reducer';
import * as fromeditextsup from './reducers/editextsup.reducer';
import * as fromeditremind from './reducers/editremind.reducer';
import * as fromedittgsch from './reducers/edittgsch.reducer';
import * as formeneroute from './reducers/eneroute.reducer';
import * as fromexfile from './reducers/exfile.reducer';
import * as fromextsupstatus from './reducers/extsupstatus.reducer';
import * as fromgetcomstats from './reducers/getcomstats.reducer';
import * as fromgetcountresp from './reducers/getcountresp.reducer';
import * as fromgetexlist from './reducers/getexlist.reducer';
import * as fromgetinexsrc from './reducers/getinexsrc.reducer';
import * as fromgetinterbysrc from './reducers/getinterbysrc.reducer';
import * as fromgetinterquota from './reducers/getinterquota.reducer';
import * as fromgetlocsrc from './reducers/getlocsrc.reducer';
import * as fromgetprocost from './reducers/getprocost.reducer';
import * as fromgetproque from './reducers/getproque.reducer';
import * as fromgetprorepfile from './reducers/getprorepfile.reducer';
import * as fromgetproreport from './reducers/getproreport.reducer';
import * as fromgetprostats from './reducers/getprostats.reducer';
import * as fromgetqcat from './reducers/getqcat.reducer';
import * as fromgetrespreport from './reducers/getrespreport.reducer';
import * as fromgetrespstatus from './reducers/getrespstatus.reducer';
import * as fromgetresstatus from './reducers/getresstatus.reducer';
import * as fromgetsrc from './reducers/getsrc.reducer';
import * as fromgetsrcex from './reducers/getsrcex.reducer';
import * as fromgetsuptest from './reducers/getsuptest.reducer';
import * as fromgettgexlist from './reducers/gettgexlist.reducer';
import * as fromgettgset from './reducers/gettgset.reducer';
import * as fromgettgstats from './reducers/gettgstats.reducer';
import * as fromgettgstatus from './reducers/gettgstatus.reducer';
import * as fromimportsur from './reducers/importsur.reducer';
import * as fromlistexpsup from './reducers/listexpsup.reducer';
import * as fromlistschin from './reducers/listschin.reducer';
import * as fromnonlocksrc from './reducers/nonlocksrc.reducer';
import * as fromquosrc from './reducers/quosrc.reducer';
import * as fromsaveexlist from './reducers/saveexlist.reducer';
import * as fromsavetgque from './reducers/savetgque.reducer';
import * as fromsavetgquota from './reducers/savetgquota.reducer';
import * as fromsavetgstatus from './reducers/savetgstatus.reducer';
import * as fromschbyquota from './reducers/schbyquota.reducer';
import * as fromsetremind from './reducers/setremind.reducer';
import * as fromshowrespfile from './reducers/showrespfile.reducer';
import * as fromupdatetgquota from './reducers/updatetgquota.reducer';
import * as fromupdatetgset from './reducers/updatetgset.reducer';
import * as fromupdatetgsrc from './reducers/updatetgsrc.reducer';
import * as fromviewextsup from './reducers/viewextsup.reducer';


export interface AppState {
  projects: Project[];
}

export const reducers = {
  projects: proj.reducers,
};

export interface GrpState {
  tgroups: TGroups[];
}

export const treducers = {
  tgroups: tgrp.reducer
};

export interface InState {
  industry: Industry[];
}

export const indreducers = {
  industry: ind.reducer
};

export const catreducers = {
  category: cat.reducer
};

export const crereducers = {
  crepro: cpro.reducer
};

export const deletereducer = {
  delete: del.delreducer
};

export const prostatreducer = {
  status: stat.statusreducer
};

export const contyreducer = {
  countries: tgrp.contreducer
};

export const cgrpreducer = {
  cgroups: cgrp.reducer
};

export const lMasterreducer = {
  region: lMaster.reducer
};

export const lValuereducer = {
  lvalues: lValue.reducer
};

export const getsreducer = {
  sources: gets.reducer
};

export const getfeasibility = {
  getfeasibility: fromgetfeasibility.reducer
};

export const viewgrp = {
  viewgrp: fromviewgrp.reducer
};

export const addextsup = {
  addextsup: fromaddextsup.reducer
};

export const crexlist = {
  crexlist: fromcrexlist.reducer
};

export const delexlist = {
  delexlist: fromdelexlist.reducer
};

export const delsurlink = {
  delsurlink: fromdelsurlink.reducer
};

export const deltgquota = {
  deltgquota: fromdeltgquota.reducer
};

export const disroute = {
  disroute: fromdisroute.reducer
};

export const editextsup = {
  editextsup: fromeditextsup.reducer
};

export const editremind = {
  editremind: fromeditremind.reducer
};

export const edittgsch = {
  edittgsch: fromedittgsch.reducer
};

export const eneroute = {
  eneroute: formeneroute.reducer
};

export const exfile = {
  exfile: fromexfile.reducer
};

export const extsupstatus = {
  extsupstatus: fromextsupstatus.reducer
};

export const getcomstats = {
  getcomstats: fromgetcomstats.reducer
};

export const getcountresp = {
  getcountresp: fromgetcountresp.reducer
};

export const getexlist = {
  getexlist: fromgetexlist.reducer
};

export const getinexsrc = {
  getinexsrc: fromgetinexsrc.reducer
};

export const getinterbysrc = {
  getinterbysrc: fromgetinterbysrc.reducer
};

export const getinterquota = {
  getinterquota: fromgetinterquota.reducer
};

export const getlocsrc = {
  getlocsrc: fromgetlocsrc.reducer
};

// ================

export const getprocost = {
  getprocost: fromgetprocost.reducer
};


export const getproque = {
  getproque: fromgetproque.reducer
};


export const getprorepfile = {
  getprorepfile: fromgetprorepfile.reducer
};


export const getproreport = {
  getproreport: fromgetproreport.reducer
};


export const getprostats = {
  getprostats: fromgetprostats.reducer
};


export const getqcat = {
  getqcat: fromgetqcat.reducer
};


export const getrespreport = {
  getrespreport: fromgetrespreport.reducer
};


export const getrespstatus = {
  getrespstatus: fromgetrespstatus.reducer
};


export const getresstatus = {
  getresstatus: fromgetresstatus.reducer
};


export const getsrc = {
  getsrc: fromgetsrc.reducer
};


export const getsrcex = {
  getsrcex: fromgetsrcex.reducer
};


export const getsuptest = {
  getsuptest: fromgetsuptest.reducer
};


export const gettgexlist = {
  gettgexlist: fromgettgexlist.reducer
};


export const gettgset = {
  gettgset: fromgettgset.reducer
};


export const gettgstats = {
  gettgstats: fromgettgstats.reducer
};


export const gettgstatus = {
  gettgstatus: fromgettgstatus.reducer
};


export const importsur = {
  importsur: fromimportsur.reducer
};


export const listexpsup = {
  listexpsup: fromlistexpsup.reducer
};


export const listschin = {
  listschin: fromlistschin.reducer
};


export const nonlocksrc = {
  nonlocksrc: fromnonlocksrc.reducer
};


export const quosrc = {
  quosrc: fromquosrc.reducer
};


export const saveexlist = {
  saveexlist: fromsaveexlist.reducer
};


export const savetgque = {
  savetgque: fromsavetgque.reducer
};


export const savetgquota = {
  savetgquota: fromsavetgquota.reducer
};


export const savetgstatus = {
  savetgstatus: fromsavetgstatus.reducer
};


export const schbyquota = {
  schbyquota: fromschbyquota.reducer
};


export const setremind = {
  setremind: fromsetremind.reducer
};


export const showrespfile = {
  showrespfile: fromshowrespfile.reducer
};


export const updatetgquota = {
  updatetgquota: fromupdatetgquota.reducer
};


export const updatetgset = {
  updatetgset: fromupdatetgset.reducer
};


export const updatetgsrc = {
  updatetgsrc: fromupdatetgsrc.reducer
};


export const viewextsup = {
  viewextsup: fromviewextsup.reducer
};
