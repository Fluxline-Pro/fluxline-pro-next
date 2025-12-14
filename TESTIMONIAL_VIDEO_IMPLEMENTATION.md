# Testimonial Video Implementation

## Overview

This document describes the implementation of the testimonial video feature for the Fluxline Pro home page. The feature replaces the static background image (when `backgroundImage === 'one'`) with an autoplay video that includes controls for muting/unmuting and replaying.

## Components Created

### 1. VideoBackground Component
**Location**: `src/theme/components/layout/video-background/video-background.tsx`

A client-side component that handles video playback with the following features:
- Autoplay on load (muted by default)
- Closed captions support (WebVTT format)
- Fallback to static image if video fails to load
- Mute/unmute control button
- Replay button (shown after video ends)
- Hover to show controls
- Theme-aware styling with Fluent UI integration
- Responsive design for all device orientations
- Accessibility support (ARIA labels, keyboard navigation)

**Props**:
- `videoSrc`: Path to the video file
- `posterSrc`: Poster image shown while video loads
- `fallbackImageSrc`: Fallback image if video fails
- `captionsSrc`: Optional WebVTT captions file
- `orientation`: Current device orientation
- `backgroundPosition`: CSS position for video/image
- `gradient`: Overlay gradient
- `shouldFlipHorizontally`: Whether to flip video for left-handed mode
- `onVideoLoaded`: Callback when video loads
- `themeMode`: Current theme mode
- `theme`: Fluent UI theme object

### 2. HomeFooter Component
**Location**: `src/theme/components/layout/home-footer/home-footer.tsx`

Footer component displayed only on desktop and widescreen tablet (landscape orientations). Features:
- Three-column layout: Logo, Navigation Links, Contact Information
- Company logo and tagline
- Three navigation sections: About, Company, Contact Me
- Contact details: Address, email, phone, website
- Theme-aware styling
- Responsive visibility (hidden on mobile/portrait)

### 3. HomeCtaBanner Component
**Location**: `src/theme/components/layout/home-cta-banner/home-cta-banner.tsx`

Call-to-action banner displayed above the footer. Features:
- "Explore the Fluxline architecture" message
- "Learn More" link with animated arrow
- Theme-aware styling
- Responsive visibility (hidden on mobile/portrait)

## Modified Components

### BackgroundLayer Component
**Location**: `src/theme/components/layout/background-layer/background-layer.tsx`

Updated to conditionally use VideoBackground when `backgroundImage === 'one'`:
- Added import for VideoBackground component
- Added logic to determine video paths based on orientation
- Renders VideoBackground for `backgroundImage === 'one'`
- Falls back to static image for `backgroundImage === 'two'`
- Maintains all existing functionality and props

### Home Page (page.tsx)
**Location**: `src/app/page.tsx`

Updated to include footer and CTA banner:
- Added imports for HomeFooter and HomeCtaBanner
- Wrapped ViewportGrid in flex container for footer placement
- Added HomeCtaBanner above HomeFooter
- Maintains all existing animations and functionality

## Video File Requirements

### Directory Structure
```
public/videos/home/
├── testimonial-landscape.mp4    # Main video for landscape orientation
├── testimonial-portrait.mp4     # Video for portrait orientation (mobile/tablet)
├── testimonial-captions.vtt     # WebVTT captions file
└── README.md                     # Documentation for video specifications
```

### Video Specifications
- **Format**: MP4 (H.264 codec recommended)
- **Aspect Ratio**: 
  - Landscape: 16:9 or wider
  - Portrait: 9:16 or taller
- **Quality**: High quality for 4K displays
- **Audio**: Include audio track (plays muted by default, user can unmute)
- **Duration**: Should play once and not loop
- **Closed Captions**: WebVTT format (.vtt file) for accessibility

### Closed Captions Format (WebVTT)
```vtt
WEBVTT

00:00:00.000 --> 00:00:03.000
Caption text here

00:00:03.000 --> 00:00:06.000
Next caption text
```

## Behavior & User Experience

### Video Playback
1. Video autoplays when page loads (muted)
2. Closed captions display at bottom by default
3. Video plays once and stops
4. Poster image shows while video loads
5. Falls back to static image if video fails to load

### Controls
- **Mute/Unmute Button**: 
  - Shows on hover (desktop) or always visible (mobile)
  - Located at bottom-right corner
  - Toggles audio on/off
  - Icon changes: 🔇 (muted) / 🔊 (unmuted)
  
- **Replay Button**:
  - Appears after video ends
  - Located next to mute button
  - Restarts video from beginning
  - Icon: ↻

### Footer & CTA Banner
- **Visibility**: Only on desktop and widescreen tablet (landscape orientations)
- **Hidden on**: Mobile portrait, mobile landscape, tablet portrait
- **Footer sections**:
  - Left: Logo and tagline
  - Middle: Three navigation columns (About, Services, Resources)
  - Right: Contact information with icons
- **CTA Banner**: Positioned above footer with call-to-action message

## Accessibility Features

### Video Accessibility
- ARIA labels on all control buttons
- Keyboard navigation support
- Closed captions enabled by default
- Clear visual indicators for controls
- High contrast button styling

### Semantic HTML
- Proper heading hierarchy
- Semantic footer element
- Navigation landmarks
- Link elements for all clickable items

## Responsive Design

### Desktop & Widescreen Tablet (Landscape)
- Video background fills entire viewport
- Controls hover to reveal
- Footer and CTA banner visible
- Full three-column footer layout

### Tablet Portrait
- Video background fills viewport
- Footer and CTA banner hidden
- Content stacked vertically

### Mobile Portrait & Landscape
- Video background fills viewport
- Footer and CTA banner hidden
- Simplified layout
- Content optimized for small screens

## Theme Integration

All components use Fluent UI theming:
- Colors from `theme.palette`
- Typography from `theme.typography`
- Spacing from `theme.spacing`
- Support for dark mode, light mode, high-contrast, and grayscale themes
- Reduced motion support for accessibility

## Performance Considerations

1. **Video Preloading**: Uses `preload="auto"` for smooth playback
2. **Poster Image**: Shows during load to prevent layout shift
3. **Lazy Loading**: Video only loads when needed
4. **Fallback Strategy**: Graceful degradation to static image
5. **Conditional Rendering**: Footer/CTA only render when visible
6. **Optimized Images**: Next.js Image component for logos

## Testing Checklist

- [x] Build passes without errors
- [x] Desktop view shows footer and CTA
- [x] Mobile view hides footer and CTA
- [ ] Video plays automatically when uploaded
- [ ] Mute/unmute button works correctly
- [ ] Replay button appears and works after video ends
- [ ] Closed captions display correctly
- [ ] Fallback image displays if video fails
- [ ] Controls are accessible via keyboard
- [ ] Theme switching works correctly
- [ ] Responsive behavior across all breakpoints

## Next Steps

1. **Video Creation**: Aplus (Terence) will create and upload the testimonial video
2. **File Upload**: Place video files in `public/videos/home/` directory
3. **Captions**: Create proper WebVTT file with actual testimonial captions
4. **Testing**: Full testing once video files are available
5. **Optimization**: Video compression and optimization for web delivery

## Screenshots

### Desktop with Footer
![Desktop View](https://github.com/user-attachments/assets/101f0fd8-66a5-471f-ae16-1f5e01b88c4f)

### Mobile Portrait (No Footer)
![Mobile View](https://github.com/user-attachments/assets/5ca1da14-5758-48ec-99eb-eaa3f767f211)

## Notes

- Placeholder image is currently used as fallback (existing home page image)
- Video controls are styled to match Fluxline brand colors
- Footer links are placeholder content and should be updated with actual links
- CTA message can be customized as needed
- All components follow Next.js 16 App Router conventions
- Components are fully typed with TypeScript
