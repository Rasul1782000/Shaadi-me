# Bug Fixes & Technical Notes - ShaadiMe Build

## Environment Constraints & Framework Adjustments
- **Framework Choice:** Although Angular was requested, the current environment is pre-configured for React/Vite. To ensure a stable preview and deployment, I have implemented the application using **React** with a **Modular Architecture** (Components, Services, Hooks) that mirrors the requested clean structure.
- **Backend Choice:** Laravel (PHP) is not natively supported in this Node.js container environment. I have implemented a robust **Express.js** backend to handle lead capture and API requests, providing the requested "Frontend + Backend" modularity.
- **Color Palette:** The PRD specified a "Deep Purple" background. Following the user's request for **"lighter colors"**, I have adjusted the theme to use a light cream/blush background (#fdf6f3) with the brand colors (Deep Purple, Coral Red) used for typography, buttons, and decorative elements.

## Fixed Issues
1. **Responsive Layout:** Fixed horizontal overflow on mobile devices by using `overflow-x-hidden` on the main container and adjusting grid columns.
2. **Form Progress:** Corrected the progress bar calculation to accurately reflect the 9-step intake flow.
3. **Image Referrer Policy:** Added `referrerPolicy="no-referrer"` to all images to prevent loading issues from external CDNs.
4. **Animation Performance:** Used `motion` (Framer Motion) for smooth transitions between form steps, ensuring no layout shifts.
5. **API Integration:** Implemented a robust error handling wrapper for the lead submission to handle network timeouts gracefully.

## Future Recommendations
- Integrate with a real database (e.g., Firebase or PostgreSQL) for persistent lead storage.
- Implement an admin dashboard to view and manage leads.
- Add email notifications using a service like SendGrid or AWS SES.
