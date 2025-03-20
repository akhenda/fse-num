import * as React from 'react';
import { Copyright } from 'lucide-react';

import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { AddNewPayment } from './add-new-payment';
import { LoanCalculatorWidget } from './loan-calculator-widget';

// This is sample data.
const data = {
  user: {
    name: 'Akhenda',
    email: 'm@example.com',
    avatar: 'https://gravatar.com/avatar/45f4df90e0ee5678201fac837e7a4820?size=256',
  },
};

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="w-1/5 sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <AddNewPayment />
        <SidebarSeparator className="mx-0" />
        <LoanCalculatorWidget />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>2025</span>
              <Copyright />
              <span>Numida</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
