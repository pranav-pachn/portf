# Plan: Adjust Sizing of Book Animation Components in About Section

## Context
The user requested to adjust the sizing of the "moonlit hammock" animation, which refers to the book components in the EngineeringManuals section of the AboutSection. Currently, the books have a fixed maximum width and a specific aspect ratio that may not utilize available screen space optimally on larger screens, while potentially being too large on smaller screens.

## Current Implementation
- In `EngineeringManuals.tsx`, each book container has:
  ```jsx
  className={`relative w-full max-w-[340px] transition-all duration-500 ...`}
  ```
- In `ManualBook.tsx`, the book element has:
  ```jsx
  className={`relative w-full aspect-[1/1.4] max-h-[500px] cursor-pointer group`}
  ```
  This sets:
  - Width: 100% of container
  - Aspect ratio: 1:1.4 (width:height) → height = 1.4 × width
  - Max height: 500px

## Problem
- On large screens, books are capped at 340px width (≈476px height), which may appear too small.
- On small screens, books expand to fill the width but may become too tall due to the fixed aspect ratio, potentially causing overflow or excessive scrolling.
- The max-height constraint of 500px is rarely reached given the current aspect ratio and width constraints, but could become relevant if adjustments are made.

## Proposed Solution
1. **Make book container width responsive** in `EngineeringManuals.tsx`:
   - Change `max-w-[340px]` to a responsive value that increases with screen size: `max-w-[20rem] lg:max-w-[36rem]` (320px base, 576px on large screens).
   - This allows books to grow larger on larger screens while maintaining a reasonable maximum width.

2. **Adjust aspect ratio** in `ManualBook.tsx` for better book proportions:
   - Change `aspect-[1/1.4]` to `aspect-[2/3]` (or `[3/4]` for a taller book) to achieve a more traditional book ratio (height ≈ 1.5 × width for 2:3).
   - Remove the `max-h-[500px]` constraint since the aspect ratio will now naturally limit height based on width, and we have a max-width on the container.

3. **Adjust 3D transform values if needed**:
   - The current scale and translate values are unitless and should scale proportionally with the new dimensions. However, we may need to adjust the `z-index` lifting or shadow intensities to maintain visual balance. This will be verified during implementation.

## Files to Modify
1. `pranav-portfolio/components/home/EngineeringManuals.tsx` - Adjust book container width constraints.
2. `pranav-portfolio/components/home/ManualBook.tsx` - Adjust aspect ratio and remove max-height constraint.

## Implementation Steps
### EngineeringManuals.tsx
- Locate the motion.div wrapping each ManualBook (around line 67).
- Replace `max-w-[340px]` with `max-w-[20rem] lg:max-w-[36rem]`.

### ManualBook.tsx
- Locate the outer motion.div (line 90).
- Replace `aspect-[1/1.4] max-h-[500px]` with `aspect-[2/3]` (remove max-h-[500px]).
- Optionally, review and adjust any hardcoded pixel values in transformations if they appear too subtle or extreme with the new sizing (e.g., the `y: -8` on hover, `z: 50` when open). These are unitless and translate to pixels in the transform matrix; they may need tuning but we'll start with the same values.

## Testing & Verification
- Verify responsiveness at various screen widths (mobile, tablet, desktop).
- Ensure books do not overflow their containers or cause horizontal scrolling.
- Check that the 3D flip animation still works naturally with the new proportions.
- Confirm that the hover and open states provide appropriate visual feedback.
- Test that the layout remains balanced with the surrounding sections (title, description, etc.).

## Risks & Considerations
- Changing the aspect ratio may affect the layout of text inside the books (spreads). The text wrapping and layout should adapt due to the flex containers inside, but we should verify readability.
- The max-width change in the container may cause extra space between books on large screens; we may need to adjust the gap or justify-content if needed.
- All changes are purely stylistic and should not affect functionality.

## Outcome
Books will be more responsive and visually balanced across screen sizes, better utilizing available space while maintaining the interactive 3D book experience.