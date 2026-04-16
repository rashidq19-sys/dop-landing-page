# Privacy Policy Page — Design Spec

**Date:** 2026-04-16
**Project:** DSPOps Marketing Landing Page
**Purpose:** Publicly accessible privacy policy required for Apple App Store and Google Play Store submissions

---

## Context

DSPOps collects significant personal and sensitive data from delivery drivers during onboarding and throughout employment. Both app stores require a publicly accessible privacy policy URL (no login, permanent link) that accurately describes what data is collected, how it is used, and user rights. This page also satisfies UK GDPR obligations.

---

## Approach

Standalone `/privacy` route — a dedicated page at `/privacy` with the same Navbar and Footer as the rest of the site. Content is a readable document layout. Footer's "Privacy Policy" link updated from `#` to `/privacy`.

---

## Data Controller Details

- **Trading name:** DSPOps
- **Contact email:** support@dspops.app
- **Jurisdiction:** UK GDPR
- **Effective date:** Written into the page content at build time

---

## Page Structure

### Layout
- Same `<Navbar />` and `<Footer />` as Home
- Content area: max-width ~760px, centred, generous vertical padding
- Typography: DM Sans (matches design system), navy text on off-white background
- Section headings: bold navy, section dividers for scannability
- Tables used for data categories and third-party services (more readable than prose lists)
- New page component: `client/src/components/PrivacyPage.tsx`
- New route: `client/src/pages/Privacy.tsx` (thin wrapper, same pattern as Home.tsx)
- Router entry in `client/src/App.tsx`: `<Route path="/privacy" component={Privacy} />`
- Footer update in `client/src/components/Footer.tsx`: Privacy Policy href changed from `#` to `/privacy`

### Sections (in order)

#### 1. Introduction
What DSPOps is (fleet management SaaS for Amazon DSP operators), who operates it (DSPOps, trading name), and the effective date. States the policy applies to drivers and managers who use the DSPOps platform.

#### 2. Information We Collect
Table format. 10 categories:

| Category | Data Collected |
|---|---|
| Identity | Full name, date of birth, email address, phone number, home address |
| Government IDs | National Insurance number, passport number, driving licence details, Right to Work codes |
| Financial | Bank account number, sort code, UTR number, VAT number |
| Documents & Photos | Licence photos, passport photos, Right to Work evidence, van inspection photos and videos |
| Employment | Driver code, shift data, deployment assignments, performance scorecards |
| Device | Push notification tokens, platform type (iOS, Android, or web) |
| Health | Medical fitness self-declarations |
| Emergency Contact | Name, phone number, and relationship of a nominated third party |
| Messages | In-app conversations between drivers and managers |
| Audit | IP address, user agent string, timestamps (recorded when signing agreements) |

#### 3. How We Use Your Information
Six purposes:
1. Fleet management and driver deployment
2. Van inspection and damage detection (AI-assisted)
3. Document verification during onboarding (AI-assisted)
4. Push notifications for shift and deployment updates
5. Driver performance tracking and scorecards
6. Payroll and employment compliance

#### 4. Third-Party Services
Named table — required by both app stores. States explicitly that DSPOps does not use data for advertising or cross-app tracking.

| Service | Data Shared | Purpose |
|---|---|---|
| Anthropic (Claude AI) | Document images (licence, passport) | Automated field extraction during onboarding |
| Roboflow | Van photo frames | AI-assisted damage detection |
| OneSignal | Device tokens, driver identifiers | Push notifications |
| Cloudflare R2 | All uploaded files and photos | Cloud file storage |
| Neon (PostgreSQL) | All structured data | Database hosting |

#### 5. Data Security
- Financial data (bank details, sort code) encrypted at rest with AES-256-GCM
- Passwords hashed with bcrypt
- Two-factor authentication (TOTP) required for manager and admin accounts
- All data transmitted over HTTPS
- Document integrity verified with SHA-256 checksums

#### 6. Data Retention
- Driver data retained for **1 year** after a driver is offboarded or the account is closed
- After that period, personal data is deleted or anonymised
- Drivers may request earlier deletion (see Your Rights section)

#### 7. Your Rights (UK GDPR)
Seven rights, each explained in one plain-English sentence:
1. Right to access your data
2. Right to correct inaccurate data
3. Right to request deletion
4. Right to restrict processing
5. Right to data portability
6. Right to withdraw consent at any time
7. Right to lodge a complaint with the ICO (ico.org.uk)

How to exercise: email support@dspops.app with the request.

#### 8. Children's Privacy
The DSPOps platform is not intended for anyone under the age of 16. We do not knowingly collect data from minors.

#### 9. Changes to This Policy
When the policy changes, the updated version will be posted at this URL with a revised effective date. Continued use of the platform after changes constitutes acceptance.

#### 10. Contact Us
For any privacy-related questions or requests: support@dspops.app

---

## Files Changed

| File | Change |
|---|---|
| `client/src/pages/Privacy.tsx` | New file — page shell with Navbar + PrivacyPage + Footer |
| `client/src/components/PrivacyPage.tsx` | New file — all policy content and layout |
| `client/src/App.tsx` | Add `/privacy` route |
| `client/src/components/Footer.tsx` | Update Privacy Policy href from `#` to `/privacy` |

---

## App Store Compliance Notes

- Page is publicly accessible at `/privacy` — no login required
- Matches Apple App Store Connect "App Privacy" nutrition label declarations
- States explicitly: no advertising tracking, no cross-app data sharing
- Google Play Data Safety: data is encrypted in transit (HTTPS) and at rest (financial fields), users can request deletion
- Third-party AI services (Anthropic, Roboflow) named as data recipients — required by Google Play
- UK GDPR rights section satisfies ICO requirements
