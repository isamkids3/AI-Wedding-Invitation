# 💍 Ilya & Alyaa - Digital Wedding Invitation

A modern, elegant, and highly interactive digital wedding invitation built with Next.js App Router, React 19, and Tailwind CSS v4. This project serves as a beautiful landing page for wedding guests to view details, add the event to their calendars, and submit their RSVP directly into a Google Spreadsheet.

## ✨ Features

- **UI/UX**: Premium aesthetic featuring sophisticated typography (Playfair Display & Montserrat), smooth animations powered by Framer Motion, and fluid scrolling with Lenis.
- **Multi-Step RSVP Wizard**: A seamless, animated multi-step form for guests to confirm attendance, specify guest counts, and leave messages.
- **Google Sheets Integration**: RSVPs are automatically saved to a Google Sheet via the Google Sheets API using Server Actions, eliminating the need for a traditional database.
- **Add to Calendar**: Custom `.ics` generation for seamless integration with Apple Calendar and Outlook, alongside one-click Google Calendar integration.
- **Anti-Spam Measures**: Built-in honeypot fields and basic IP-based rate limiting to prevent bot submissions.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Map & Navigation Integrations**: Embedded Google Maps and direct links to Waze and Google Maps for easy navigation to the venue.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Storage**: [Google Sheets API](https://theoephraim.github.io/node-google-spreadsheet/) & [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js 18+ installed on your machine.

### 1. Clone & Install

```bash
git clone https://github.com/isamkids3/AI-Wedding-Invitation.git
cd wedding-invitation
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory. You will need to set up a Google Cloud Project, enable the Google Sheets API, and generate a Service Account key to get these values.

```env
# The email address of your Google Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"

# The private key for your service account (replace literal newlines with \n)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# The ID of the Google Sheet (found in the URL of your spreadsheet)
GOOGLE_SHEET_ID="your_google_sheet_id_here"
```

*Note: Make sure to share your target Google Sheet with your Service Account email address, giving it "Editor" permissions.*

### 3. Google Sheet Setup

In your connected Google Sheet, ensure the first sheet (Sheet1) has the following headers in the first row:
- `Timestamp`
- `Name`
- `Email`
- `Attending`
- `GuestCount`
- `Message`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Customization

To customize this invitation for your own wedding:
1. **Constants**: Edit the `src/lib/constants.ts` file to update names, dates, times, and venue locations. This serves as the central source of truth for all wedding details.
2. **Colors**: Modify the CSS variables in `src/app/globals.css` to match your wedding's color palette.
3. **Media**: Replace the placeholder image at `public/images/couple.jpg` and add your background music to `public/songs/`.

## 📜 License

This project is licensed under the terms of the LICENSE file included in the repository.
