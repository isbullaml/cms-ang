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
  // Tutor Management System Menu
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-objects-column',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Students',
      icon: 'pi pi-graduation-cap',
      routerLink: '/students'
    },
    {
      label: 'Subjects',
      icon: 'pi pi-book',
      routerLink: '/subjects'
    },
    {
      label: 'Payments',
      icon: 'pi pi-credit-card',
      routerLink: '/payments'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/settings'
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
