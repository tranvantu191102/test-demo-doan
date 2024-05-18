import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SettingComponent } from "../setting/setting";
import { HistoryComponent } from "../history/history";
import { InformationComponent } from "../information/information";
import { HomeComponent } from "./home";

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'setting'
                    },
                    {
                        path: 'setting',
                        component: SettingComponent
                    },
                    {
                        path: 'history',
                        component: HistoryComponent
                    },
                    {
                        path: 'info',
                        component: InformationComponent
                    }
                ]
            },
        ])
    ]
})
export class HomeModule {

}