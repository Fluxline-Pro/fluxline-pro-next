# Video Files Location

This directory is for the testimonial video files for the home page.

## Required Files

The following files are expected to be placed in this directory:

1. **testimonial-landscape.mp4** - Main testimonial video for landscape orientation
2. **testimonial-portrait.mp4** - Testimonial video for portrait orientation (mobile/tablet)
3. **testimonial-captions.vtt** - WebVTT captions file for accessibility

## Video Specifications

- Format: MP4 (H.264 codec recommended)
- Aspect Ratio: 
  - Landscape: 16:9 or wider
  - Portrait: 9:16 or taller
- Quality: High quality for 4K displays
- Audio: Include audio track (will play muted by default, user can unmute)
- Closed Captions: WebVTT format (.vtt file)

## Notes

- Videos will autoplay muted with captions visible by default
- Users can unmute to hear audio
- Videos play once and show a replay button when finished
- Falls back to static image if video fails to load
