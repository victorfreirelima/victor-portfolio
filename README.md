# Victor Freire - Personal Portfolio

This is a production-ready personal portfolio built with a modern stack focusing on high-fidelity structured layout, premium typography, and technical robustness.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **CMS**: Sanity (v3) 
- **Language**: TypeScript

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.local.env` or `.env.local` file at the root of the project with your Sanity credentials.
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-03-26
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the website.

## Sanity Setup (Content Management)

If you haven't created a Sanity project yet:
1. Initialize your project on [sanity.io](https://www.sanity.io/).
2. Grab your Project ID.
3. Once running locally, navigate to `http://localhost:3000/studio` to access the embedded CMS.
4. You will be prompted to log in. Once logged in, you can start adding Site Settings, Projects, Philosophies, Timeline Entries, and Contact Info models.
5. The frontend is designed to safely fallback to placeholder content if the CMS is empty. For full fidelity, ensure that the `Site Settings` document is published.

## How to Edit Content

1. Log into your production CMS or locally at `/studio`.
2. Navigate to **Content**.
3. All blocks of text, colors for the project covers (use hex values), images, tracking markers, and navigation are controllable from here.
4. Updates should automatically flow to the frontend (ensure Next.js revalidation strategy fits your workflow – currently set to 60 seconds interval).

## Deployment (Vercel Ready)

1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and Import the project.
3. During the setup phase in Vercel, populate the Environment Variables you created in `.env.local`.
4. Deploy. Vercel will automatically detect Next.js and build it correctly. Ensure the Sanity project URLs are updated with your final production domain in the Sanity management dashboard under API settings (CORS Origins).

---
*Created by Antigravity*
