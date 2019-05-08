import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of'
import { map, switchMap, catchError } from 'rxjs/operators';


import * as savetrgregionActions from '../actions/saveTargetGrpRegion.action'
import * as fromServices from '../service';

@Injectable()
export class saveTrgRegionEffects {
    constructor(private actions$: Actions, private tgroupService: fromServices.ProService) { }

    // @Effect()
    // savetargetregion$ = this.actions$.ofType(savetrgregionActions.SAVETRGGRPREG)
    //     .pipe(
    //         switchMap((action: any) => {
    //             return this.tgroupService
    //                 .saveRegionalData(action.payload.target_group_id, action.payload.location_country_map_id, action.payload.location)
    //                 .pipe(
    //                     map(data => new savetrgregionActions.saveTrgGrpRegionSuccess(data)),
    //                     catchError(error => of(new savetrgregionActions.saveTrgGrpRegionFailure(error)))
    //                 )
    //         })
    //     )


}