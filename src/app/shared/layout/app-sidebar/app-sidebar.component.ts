import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    PanelMenuModule
  ],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent {
  // CMS Menu Items using PrimeNG MenuItem structure
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Coaches',
      icon: 'pi pi-users',
      items: [
        {
          label: 'All Coaches',
          icon: 'pi pi-list',
          routerLink: '/coaches'
        },
        {
          label: 'Add Coach',
          icon: 'pi pi-user-plus',
          routerLink: '/coaches/add'
        },
        {
          label: 'Coach Analytics',
          icon: 'pi pi-chart-bar',
          routerLink: '/coaches/analytics'
        }
      ]
    },
    {
      label: 'Clients',
      icon: 'pi pi-user',
      items: [
        {
          label: 'All Clients',
          icon: 'pi pi-list',
          routerLink: '/clients'
        },
        {
          label: 'Add Client',
          icon: 'pi pi-user-plus',
          routerLink: '/clients/add'
        },
        {
          label: 'Progress Tracking',
          icon: 'pi pi-chart-line',
          routerLink: '/clients/progress'
        },
        {
          label: 'Client Groups',
          icon: 'pi pi-users',
          routerLink: '/clients/groups'
        }
      ]
    },
    {
      label: 'Programs',
      icon: 'pi pi-book',
      items: [
        {
          label: 'Training Programs',
          icon: 'pi pi-list',
          routerLink: '/programs'
        },
        {
          label: 'Create Program',
          icon: 'pi pi-plus',
          routerLink: '/programs/create'
        },
        {
          label: 'Program Templates',
          icon: 'pi pi-copy',
          routerLink: '/programs/templates'
        },
        {
          label: 'Exercise Library',
          icon: 'pi pi-database',
          routerLink: '/programs/exercises'
        }
      ]
    },
    {
      label: 'Sessions',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'Calendar',
          icon: 'pi pi-calendar',
          routerLink: '/calendar'
        },
        {
          label: 'Upcoming Sessions',
          icon: 'pi pi-clock',
          routerLink: '/sessions/upcoming'
        },
        {
          label: 'Session History',
          icon: 'pi pi-history',
          routerLink: '/sessions/history'
        },
        {
          label: 'Book Session',
          icon: 'pi pi-plus-circle',
          routerLink: '/sessions/book'
        }
      ]
    },
    {
      label: 'Assessments',
      icon: 'pi pi-file-edit',
      items: [
        {
          label: 'Assessment Forms',
          icon: 'pi pi-file',
          routerLink: '/assessments/forms'
        },
        {
          label: 'Assessment Results',
          icon: 'pi pi-chart-pie',
          routerLink: '/assessments/results'
        },
        {
          label: 'Create Assessment',
          icon: 'pi pi-plus',
          routerLink: '/assessments/create'
        }
      ]
    },
    {
      label: 'Communication',
      icon: 'pi pi-comments',
      items: [
        {
          label: 'Messages',
          icon: 'pi pi-envelope',
          routerLink: '/messages',
          badge: '3'
        },
        {
          label: 'Notifications',
          icon: 'pi pi-bell',
          routerLink: '/notifications'
        },
        {
          label: 'Announcements',
          icon: 'pi pi-megaphone',
          routerLink: '/announcements'
        }
      ]
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-bar',
      items: [
        {
          label: 'Overview',
          icon: 'pi pi-chart-pie',
          routerLink: '/reports'
        },
        {
          label: 'Revenue Reports',
          icon: 'pi pi-dollar',
          routerLink: '/reports/revenue'
        },
        {
          label: 'Client Reports',
          icon: 'pi pi-users',
          routerLink: '/reports/clients'
        },
        {
          label: 'Performance Reports',
          icon: 'pi pi-chart-line',
          routerLink: '/reports/performance'
        }
      ]
    },
    {
      label: 'Payments',
      icon: 'pi pi-credit-card',
      items: [
        {
          label: 'Invoices',
          icon: 'pi pi-file',
          routerLink: '/invoices'
        },
        {
          label: 'Subscriptions',
          icon: 'pi pi-sync',
          routerLink: '/payments/subscriptions'
        },
        {
          label: 'Payment History',
          icon: 'pi pi-history',
          routerLink: '/payments/history'
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'General Settings',
          icon: 'pi pi-sliders-h',
          routerLink: '/settings'
        },
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: '/profile'
        },
        {
          label: 'Integrations',
          icon: 'pi pi-link',
          routerLink: '/settings/integrations'
        },
        {
          label: 'Team Management',
          icon: 'pi pi-users',
          routerLink: '/settings/team'
        }
      ]
    }
  ];

  readonly isExpanded$;
  readonly isMobileOpen$;
  readonly isHovered$;

  private subscription: Subscription = new Subscription();

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    this.isHovered$ = this.sidebarService.isHovered$;
  }

  ngOnInit() {
    // Subscribe to router events
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.cdr.detectChanges();
        }
      })
    );

    // Subscribe to combined observables
    this.subscription.add(
      combineLatest([this.isExpanded$, this.isMobileOpen$, this.isHovered$]).subscribe(
        ([isExpanded, isMobileOpen, isHovered]) => {
          this.cdr.detectChanges();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSidebarMouseEnter() {
    this.isExpanded$.subscribe(expanded => {
      if (!expanded) {
        this.sidebarService.setHovered(true);
      }
    }).unsubscribe();
  }

  onMenuItemClick() {
    this.isMobileOpen$.subscribe(isMobile => {
      if (isMobile) {
        this.sidebarService.setMobileOpen(false);
      }
    }).unsubscribe();
  }
}
