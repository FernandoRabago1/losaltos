import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedProjectsManager from '@/components/admin/FeaturedProjectsManager';
import { FeaturedProjectWithDetails } from '@/lib/actions/featured-projects';

// Mock the actions
vi.mock('@/lib/actions/featured-projects', () => ({
  addFeaturedProject: vi.fn(),
  removeFeaturedProject: vi.fn(),
  toggleFeaturedProject: vi.fn(),
  reorderFeaturedProjects: vi.fn(),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

const mockFeaturedProjects: FeaturedProjectWithDetails[] = [
  {
    id: '1',
    projectId: 'p1',
    order: 0,
    enabled: true,
    project: {
      id: 'p1',
      slug: 'project-1',
      title: 'Project 1',
      featuredImage: '/image1.jpg',
      location: 'Los Angeles',
      year: '2024',
      status: 'completado',
      typology: 'residencial',
      shortDescription: 'Test project 1',
    },
  },
  {
    id: '2',
    projectId: 'p2',
    order: 1,
    enabled: false,
    project: {
      id: 'p2',
      slug: 'project-2',
      title: 'Project 2',
      featuredImage: '/image2.jpg',
      location: 'San Francisco',
      year: '2023',
      status: 'en progreso',
      typology: 'comercial',
      shortDescription: 'Test project 2',
    },
  },
];

const mockAvailableProjects = [
  {
    id: 'p3',
    slug: 'project-3',
    title: 'Project 3',
    featuredImage: '/image3.jpg',
    location: 'San Diego',
    year: '2024',
    status: 'completado',
    typology: 'industrial',
  },
];

describe('FeaturedProjectsManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render featured projects list', () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    expect(screen.getByText('Featured Projects (2)')).toBeInTheDocument();
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('should render available projects', () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    expect(screen.getByText('Available Projects (1)')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  it('should show preview when toggle is clicked', async () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    const previewButton = screen.getByText('Show Preview');
    fireEvent.click(previewButton);

    await waitFor(() => {
      expect(screen.getByText('Homepage Preview')).toBeInTheDocument();
    });
  });

  it('should display order badges correctly', () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    // Order badges should show 1 and 2 (order + 1)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should show enabled/disabled state visually', () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    // Find the visibility toggle buttons (Eye icons)
    const visibilityButtons = screen.getAllByRole('button', { name: /hide project|show project/i });
    expect(visibilityButtons).toHaveLength(2);
  });

  it('should display empty state when no featured projects', () => {
    render(<FeaturedProjectsManager initialFeaturedProjects={[]} availableProjects={mockAvailableProjects} />);

    expect(screen.getByText('No featured projects yet. Add some from the list below.')).toBeInTheDocument();
  });

  it('should display all projects featured message when no available projects', () => {
    render(<FeaturedProjectsManager initialFeaturedProjects={mockFeaturedProjects} availableProjects={[]} />);

    expect(screen.getByText('All projects are featured!')).toBeInTheDocument();
  });

  it('should show add to featured button for available projects', () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    const addButtons = screen.getAllByText('Add to Featured');
    expect(addButtons).toHaveLength(1);
  });

  it('should show project details correctly', () => {
    render(
      <FeaturedProjectsManager
        initialFeaturedProjects={mockFeaturedProjects}
        availableProjects={mockAvailableProjects}
      />
    );

    expect(screen.getByText('Los Angeles • 2024')).toBeInTheDocument();
    expect(screen.getByText('San Francisco • 2023')).toBeInTheDocument();
  });
});
