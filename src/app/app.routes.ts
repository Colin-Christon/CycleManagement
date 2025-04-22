import { Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AdminInventoryComponent } from './components/admin-inventory/admin-inventory.component';
import { DashboardComponent } from './components/admin-inventory/dashboard/dashboard.component';
import { InventoryComponent } from './components/admin-inventory/inventory/inventory.component';
import { MenuComponent } from './components/admin-inventory/menu/menu.component';
import { OrdersComponent } from './components/admin-inventory/orders/orders.component';
import { StaffComponent } from './components/admin-inventory/staff/staff.component';
import { EmployeePersonalDetailComponent } from './components/admin-inventory/employee-personal-detail/employee-personal-detail.component';
import { ReportsComponent } from './components/admin-inventory/reports/reports.component';
import { EmployeInterfaceComponent } from './components/employe-interface/employe-interface.component';
import { CycleDescComponent } from './components/employe-interface/cycle-desc/cycle-desc.component';
import { PaymentSuccessfulComponent } from './components/employe-interface/payment-successful/payment-successful.component';
import { BillingComponent } from './components/employe-interface/billing/billing.component';
import { UpiPaymentComponent } from './components/employe-interface/upi-payment/upi-payment.component';
import { CycleHomeComponent } from './components/employe-interface/cycle-home/cycle-home.component';
import { EmployeeDetailsComponent } from './components/add-component/employee-details/employee-details.component';
import { CycleInventoryComponent } from './components/add-component/cycle-inventory/cycle-inventory.component';
import { AddCategoryComponent } from './components/add-component/add-category/add-category.component';
import { AllCyclesComponent } from './components/employe-interface/all-cycles/all-cycles.component';
import { PaymentMethodComponent } from './components/employe-interface/payment-method/payment-method.component';
import { CustomerDetailsComponent } from './components/employe-interface/customer-details/customer-details.component';
import { AuthGuardService as AuthGuard  } from './services/auth/auth-guard.service';


export const routes: Routes = [
    {path:"",redirectTo:'/login',pathMatch:"full"},
    {path:"register",component:UserRegisterComponent},
    {path:"login", component:UserLoginComponent},
    {path:"editEmployee/:userId", component: EmployeeDetailsComponent},
    {path:"admin",component:AdminInventoryComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'menu', component: MenuComponent },
            { path: 'inventory', component: InventoryComponent },
            { path: 'orders', component:OrdersComponent},
            { path: 'staff', component:StaffComponent},
            { path: 'staffPersonal', component: EmployeePersonalDetailComponent},
            { path: 'reports', component: ReportsComponent},
            { path: 'addCycleInventory', component:CycleInventoryComponent},
            { path: 'addCycleCategory', component: AddCategoryComponent}
          ],
          canActivate: [AuthGuard]
    },
    {path:"employee", component:EmployeInterfaceComponent,
        children: [
            { path: 'cycleHome', component:CycleHomeComponent},
            { path: 'allCycles', component:AllCyclesComponent},
            { path: 'cycledesc/:cycleId', component:CycleDescComponent},
            { path: 'paymentSuccess', component:PaymentSuccessfulComponent },
            { path: 'billing', component: BillingComponent },
            { path: 'billing/:cycleId', component: BillingComponent},
            { path: 'customerDetails', component: CustomerDetailsComponent},
            { path: 'paymentMethod', component: PaymentMethodComponent},
            { path: 'upi' , component: UpiPaymentComponent}
        ]
    }
];
