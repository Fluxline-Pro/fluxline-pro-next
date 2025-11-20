/**
 * Testimonials Type Definitions
 * Data structure for client testimonials
 */

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  imageUrl: string;
  imageAlt: string;
  quote: string; // Short quote for card display
  fullText: string; // Full testimonial text for modal
  rating: number; // 1-5 star rating
  services: string[]; // Services provided
  featured: boolean; // Whether to highlight this testimonial
  date: Date;
  category: string; // Primary service category
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick?: () => void;
  viewType?: 'grid' | 'small' | 'large';
}

export interface TestimonialModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  testimonial: Testimonial;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  onTestimonialClick?: (testimonial: Testimonial) => void;
}

export interface FeaturedTestimonialProps {
  testimonial: Testimonial;
  onViewFull?: () => void;
}
