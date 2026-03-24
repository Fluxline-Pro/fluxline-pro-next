# Video Upload Instructions for Aplus (Terence)

## Overview
The testimonial video feature has been fully implemented and is ready for your video files. Once you upload the videos, they will automatically replace the static background on the home page.

## Where to Upload Videos

Upload your video files to this directory:
```
public/videos/home/
```

## Required Files

### 1. Landscape Video (Desktop/Laptop)
- **Filename**: `testimonial-landscape.mp4`
- **Recommended specs**:
  - Aspect ratio: 16:9 or wider
  - Resolution: 1920x1080 or higher (4K support)
  - Format: MP4 with H.264 codec
  - Duration: Your preferred length (video will play once)
  - Include audio track (will play muted by default, users can unmute)

### 2. Portrait Video (Mobile/Tablet)
- **Filename**: `testimonial-portrait.mp4`
- **Recommended specs**:
  - Aspect ratio: 9:16 or taller
  - Resolution: 1080x1920 or higher
  - Format: MP4 with H.264 codec
  - Duration: Should match landscape video
  - Include audio track

### 3. Closed Captions File
- **Filename**: `testimonial-captions.vtt`
- **Format**: WebVTT (Web Video Text Tracks)
- **Purpose**: Accessibility - displays text at bottom of video

## Closed Captions Format (WebVTT)

Create a text file named `testimonial-captions.vtt` with this format:

```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
First caption text here

00:00:05.000 --> 00:00:10.000
Second caption text here

00:00:10.000 --> 00:00:15.000
Third caption text here
```

**Timing format**: `HH:MM:SS.mmm` (hours:minutes:seconds.milliseconds)

## Example Directory After Upload

```
public/videos/home/
├── testimonial-landscape.mp4      # Your landscape video
├── testimonial-portrait.mp4       # Your portrait video
├── testimonial-captions.vtt       # Your captions file
├── testimonial-captions-sample.vtt  # Sample (can be deleted)
├── testimonial-placeholder.jpg    # Fallback image (keep this)
└── README.md                      # Documentation
```

## Video Behavior

Once uploaded, the videos will:
- ✅ Autoplay muted when page loads
- ✅ Display closed captions at bottom
- ✅ Show mute/unmute button (hover to reveal on desktop)
- ✅ Play once and stop (no looping)
- ✅ Show replay button after ending
- ✅ Fallback to static image if video fails to load

## Testing After Upload

1. Navigate to the home page
2. Video should start playing automatically (muted)
3. Captions should appear at bottom
4. Hover over video to see controls (desktop)
5. Click mute button to hear audio
6. After video ends, click replay to watch again

## Video Optimization Tips

For best web performance:
1. **Compression**: Use H.264 codec with reasonable bitrate
   - Recommended: 5-8 Mbps for 1080p
   - Higher for 4K but test load times
2. **File size**: Keep under 50MB if possible
3. **Length**: 30-60 seconds is ideal for web
4. **Audio**: Include clear audio but video works muted too
5. **Format**: MP4 is universally supported

## Tools for Video Conversion

If you need to convert your video:
- **HandBrake** (free, all platforms)
- **FFmpeg** (command line)
- **Adobe Media Encoder** (if you have Creative Cloud)
- **Online converters**: CloudConvert, Online-Convert

## Caption Generation Tools

For creating WebVTT captions:
- **YouTube Studio** (auto-generate, then download as SRT and convert)
- **Rev.com** (paid transcription service)
- **Manual**: Use the sample file as template
- **Subtitle Edit** (free desktop software)

## Need Help?

If you have questions or need different video specifications:
1. Ask the development team
2. Test with shorter/lower quality versions first if needed

## Committing the Videos

After uploading to your local copy:

```bash
cd /path/to/fluxline-pro-next
git add public/videos/home/testimonial-landscape.mp4
git add public/videos/home/testimonial-portrait.mp4
git add public/videos/home/testimonial-captions.vtt
git commit -m "Add testimonial videos and captions"
git push origin copilot/create-testimonial-video
```

## Current Status

The feature is complete and working with fallback image. As soon as you upload the videos:
- ✅ No code changes needed
- ✅ Videos will load automatically
- ✅ All controls and features will work
- ✅ Responsive behavior is ready
- ✅ Footer and CTA banner are in place

Just drop the files in `public/videos/home/` and you're done!
