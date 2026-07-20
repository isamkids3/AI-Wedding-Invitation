# 💍 Ilya & Alyaa — Digital Wedding Web Application

A modern, elegant, and interactive wedding web application built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. 

This repository powers the digital wedding experience for **Ilya & Alyaa**, featuring an event-day **Thank You & Directions Guide** landing page, an interactive **Hall & Parking Map**, a **Guest Wedding Messages Showcase** accessible via QR code, and a preserved **Google Sheets-backed RSVP system**.

---

## 🌟 Key Features

### 1. 💌 Thank You & Directions Landing Page (`/` & `/ilya-alyaa-wedding-invite`)
- **Event-Day Hero Header**: Displays an elegant *"Thank You For Coming!"* banner framed by the couple's background portrait, smooth entrance animations, decorative arch borders, and typography using **Cinzel Decorative** and **Ballet** fonts.
- **Background Music Toggle**: Floating audio toggle button with automatic fade-in capabilities playing background music.
- **Location & Navigation**: Embedded interactive Google Map alongside quick-launch buttons for **Waze** and **Google Maps**.
- **Local Parking Guide Video**: Embedded HTML5 video guide (`/media/parking.mp4`) accompanied by structured parking zone instructions:
  - **Zone:** Basement UG, Zone D (K23)
  - **Directions:** Look for DeRoses flags near the lift lobby in Basement UG.
- **Interactive Hall Layout Map**: High-resolution hall map (`/media/hall_map.png`) featuring a click-to-expand fullscreen lightbox preview.

### 2. 💌 Guest Wedding Messages Showcase (`/ilya-alyaa-wedding-messages`)
- **Direct QR Code Access**: Optimized for guests scanning QR codes at the venue, with zero password barriers or forced delays.
- **Presentation View**: Elegant card deck display with dynamic font sizing based on message length, guest signatures, and manual Previous/Next navigation (`<ChevronLeft />`, `<ChevronRight />`, arrow keys).
- **Grid Gallery & Search**: Searchable grid view allowing guests to search by name or message text in real time and click any message to expand in presentation view.

### 3. 📝 Preserved Multi-Step RSVP System (`RSVPWizard.tsx`)
- **Multi-Step Form**: Form for confirming attendance, guest count, and submitting personal messages.
- **Google Sheets API Integration**: Server Actions securely write RSVP responses into a Google Sheet in real time.
- **Anti-Spam Controls**: Built-in honeypot fields to prevent automated submission spam.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Library & Language** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & CSS Custom Variables |
| **Typography** | Cinzel Decorative, Ballet, Montserrat, Playfair Display |
| **Motion & Animation** | [Framer Motion](https://www.framer.com/motion/) & [Lenis Scroll](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend Integration** | Google Sheets API (`google-spreadsheet`), Next.js Server Actions |

---

## ⏳ Project Timeline & Evolution

The web app evolved through three distinct phases to serve the wedding journey:

### 📅 Phase 1: Pre-Wedding Digital Invitation & RSVP Collection
- Implemented the animated invitation cover overlay ("You're Invited").
- Displayed countdown timer counting down to the wedding date.
- Collected guest attendance and wishes via `RSVPWizard` synced to a Google Sheet database.

### 🚗 Phase 2: Event-Day Transition (Thank You & Parking Directions)
- Replaced the pre-wedding countdown with a **"Thank You For Coming!"** landing view on `/` and `/ilya-alyaa-wedding-invite`.
- Embedded local video walkthrough (`/media/parking.mp4`) and hall layout diagram (`/media/hall_map.png`).
- Reordered page elements to prioritize venue location and navigation links above parking instructions.
- Removed the initial overlay card for instant landing on event day details.

### 📱 Phase 3: QR Code Accessible Wedding Messages
- Re-architected `/ilya-alyaa-wedding-messages` for venue guests scanning QR codes.
- Removed password authentication screens for seamless access.
- Removed automatic slide switching and speed controls in favor of guest-controlled manual browsing and grid searching.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- `npm` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/isamkids3/AI-Wedding-Invitation.git
   cd wedding-invitation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Google Service Account Credentials (for RSVP Google Sheets)
   GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID="your_google_sheet_id"

   # Wedding Messages JSON Payload
   WEDDING_MESSAGES='[{"name":"Guest Name","msg":"Congratulations Ilya & Alyaa!"}]'
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Project Structure

```
wedding-invitation/
├── public/
│   ├── images/
│   │   └── couple.jpg
│   ├── media/
│   │   ├── hall_map.png
│   │   └── parking.mp4
│   └── songs/
│       └── testsong1.mp3
├── src/
│   ├── app/
│   │   ├── actions/
│   │   ├── ilya-alyaa-wedding-invite/
│   │   │   └── page.tsx
│   │   ├── ilya-alyaa-wedding-messages/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── MapSection.tsx
│   │   ├── MusicToggle.tsx
│   │   ├── Overlay.tsx
│   │   ├── ParkingAndVenueMap.tsx
│   │   ├── RSVPWizard.tsx
│   │   ├── ThankYouHero.tsx
│   │   ├── VitalStats.tsx
│   │   └── WeddingMessagesShowcase.tsx
│   └── lib/
│       ├── constants.ts
│       └── utils.ts
└── README.md
```

---

## 📜 License

This project is licensed under the MIT License.
