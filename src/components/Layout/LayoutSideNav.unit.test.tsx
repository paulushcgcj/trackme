import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, afterEach } from 'vitest';

import * as layoutContext from '@/context/layout';
import { LayoutProvider } from '@/context/layout';

import { LayoutSideNav } from './LayoutSideNav';

// Mock useLayout to control isSideNavExpanded
const mockUseLayout = vi.spyOn(layoutContext, 'useLayout');

const renderComponent = () =>
  render(
    <MemoryRouter>
      <LayoutProvider>
        <LayoutSideNav />
      </LayoutProvider>
    </MemoryRouter>,
  );

describe('LayoutSideNav', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with side nav expanded', () => {
    mockUseLayout.mockReturnValue({
      isSideNavExpanded: true,
      toggleSideNav: vi.fn(),
      isHeaderPanelOpen: false,
      toggleHeaderPanel: vi.fn(),
      closeHeaderPanel: vi.fn(),
    });
    renderComponent();
    expect(screen.getByRole('navigation')).not.toBeNull();
    expect(screen.getByText(/dashboard/i)).not.toBeNull();
    expect(screen.getByText(/settings/i)).not.toBeNull();
  });

  it('renders with side nav collapsed', () => {
    mockUseLayout.mockReturnValue({
      isSideNavExpanded: false,
      toggleSideNav: vi.fn(),
      isHeaderPanelOpen: false,
      toggleHeaderPanel: vi.fn(),
      closeHeaderPanel: vi.fn(),
    });
    renderComponent();
    expect(screen.getByRole('navigation')).not.toBeNull();
  });

  it('links have correct hrefs', () => {
    mockUseLayout.mockReturnValue({
      isSideNavExpanded: true,
      toggleSideNav: vi.fn(),
      isHeaderPanelOpen: false,
      toggleHeaderPanel: vi.fn(),
      closeHeaderPanel: vi.fn(),
    });
    renderComponent();
    const dashboardLink = screen.getByText(/dashboard/i).closest('a');
    const settingsLink = screen.getByText(/settings/i).closest('a');
    expect(dashboardLink?.getAttribute('href')).toContain('dashboard');
    expect(settingsLink?.getAttribute('href')).toContain('settings');
  });
});
