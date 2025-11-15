# TebTally Pro - Unified Dashboard Plan

## 📋 Product Overview

**Vision:** TebTally Pro is a unified classroom management hub that brings all free tools together with cloud sync, premium features, cross-tool integrations, and professional capabilities that save teachers hours every week.

**Target Users:**
- Primary: Elementary/middle school teachers (Grades K-8)
- Secondary: Special education teachers, substitute teachers, homeschool parents

**Core Value Proposition:**
- **Free Tools:** Simple, standalone, no accounts (current offering)
- **TebTally Pro:** All tools in one place + cloud sync + premium features + integrations + analytics

---

## 🏗️ Architecture & Structure

### **Application Structure:**

```
TebTally Hub (Landing Site) - Current site at tebtally.com
├── Free Tools (standalone, no login)
│   ├── Energy Dial (basic)
│   ├── Class Dayboard (Mon-Fri, basic)
│   ├── Group Picker (basic)
│   ├── Name Picker
│   ├── Timers (4 variants)
│   ├── Wheel Spinner
│   ├── Dice Roller
│   ├── Coin Flipper
│   ├── Seating Organiser
│   └── Noise Meter
│
├── Premium Apps (separate products, separate logins)
│   ├── SpellTally
│   ├── TrackTally
│   └── WritingTally
│
└── TebTally Pro (NEW - unified dashboard with login)
    ├── Dashboard (home/overview)
    ├── Class Dayboard Pro
    ├── Energy Dial Pro
    ├── Group Picker Pro
    ├── All other free tools (enhanced versions)
    ├── Integrations Hub
    └── Settings & Account
```

### **Tech Stack:**

**Frontend:**
- Next.js 15 (App Router) - same as current
- React 19 - same as current
- TypeScript - same as current
- Tailwind CSS or keep current CSS approach
- React Query (TanStack Query) for data fetching and caching
- Zustand or Jotai for state management

**Backend & Database:**
- Next.js API Routes (serverless functions on Vercel)
- **Neon PostgreSQL** - Serverless Postgres database
  - Autoscaling
  - Branching for development/staging
  - Built-in connection pooling
- **Prisma** or **Drizzle ORM** for database access and migrations

**Authentication:**
- **NextAuth.js v5 (Auth.js)** for authentication
- **Google OAuth** as primary authentication method
- Email/password as secondary option
- Session management with JWT tokens
- Secure httpOnly cookies

**Hosting & Deployment:**
- **Vercel** for hosting and serverless functions
  - Preview deployments for every PR
  - Environment variables management
  - Edge functions for global performance
- **Neon** for database hosting
  - Database branches per Vercel preview deployment

**Payments:**
- **Stripe** for subscription management
  - Stripe Customer Portal for self-service
  - Webhooks for subscription events

**File Storage:**
- **Vercel Blob** for PDF exports and file uploads
- Or **Cloudflare R2** for larger storage needs

**Email:**
- **Resend** or **SendGrid** for transactional emails
  - Welcome emails
  - Password resets
  - Subscription notifications

---

## 🎯 Feature Matrix: Free vs Pro

### **1. Class Dayboard**

| Feature | Free | Pro |
|---------|------|-----|
| Monday-Friday schedules | ✅ | ✅ |
| Display mode with live clock | ✅ | ✅ |
| Current block highlighting | ✅ | ✅ |
| Progress bar | ✅ | ✅ |
| Icon picker (14 icons) | ✅ | ✅ |
| Copy schedule between days | ✅ | ✅ |
| localStorage only | ✅ | ❌ |
| **Cloud sync across devices** | ❌ | ✅ |
| **Weekly templates (save/load)** | ❌ | ✅ |
| **Drag-and-drop scheduling** | ❌ | ✅ |
| **Edit blocks (not just delete/re-add)** | ❌ | ✅ |
| **Special events & exceptions** | ❌ | ✅ |
| **Multi-class support** | ❌ | ✅ |
| **Block notes/descriptions** | ❌ | ✅ |
| **Color coding by subject** | ❌ | ✅ |
| **PDF export** | ❌ | ✅ |
| **Share link (parents can view)** | ❌ | ✅ |
| **Calendar sync (iCal/Google)** | ❌ | ✅ |
| **Energy Dial integration** | ❌ | ✅ |
| **Behavior tracking integration** | ❌ | ✅ |
| **Time allocation analytics** | ❌ | ✅ |
| **Custom themes** | ❌ | ✅ |

### **2. Energy Dial**

| Feature | Free | Pro |
|---------|------|-----|
| Slider (1-10 scale) | ✅ | ✅ |
| Log energy levels | ✅ | ✅ |
| Today's logs (last 5) | ✅ | ✅ |
| Last 7 days history | ✅ | ✅ |
| Visual emojis & colors | ✅ | ✅ |
| Average energy per day | ✅ | ✅ |
| localStorage only | ✅ | ❌ |
| **Cloud sync** | ❌ | ✅ |
| **Full history (unlimited)** | ❌ | ✅ |
| **Monthly/yearly trends** | ❌ | ✅ |
| **Energy by subject correlation** | ❌ | ✅ |
| **Energy by time of day patterns** | ❌ | ✅ |
| **Export reports (PDF/CSV)** | ❌ | ✅ |
| **Notes per energy log** | ❌ | ✅ |
| **Quick log from Dayboard** | ❌ | ✅ |
| **Classroom vs individual student tracking** | ❌ | ✅ |
| **Recommendations engine** | ❌ | ✅ |

### **3. Group Picker**

| Feature | Free | Pro |
|---------|------|-----|
| Random group generation | ✅ | ✅ |
| By number or size | ✅ | ✅ |
| Shared student list | ✅ | ✅ |
| Bulk import students | ✅ | ✅ |
| localStorage only | ✅ | ❌ |
| **Cloud sync student lists** | ❌ | ✅ |
| **Multiple class rosters** | ❌ | ✅ |
| **Student properties (reading level, etc.)** | ❌ | ✅ |
| **Keep-apart rules** | ❌ | ✅ |
| **Keep-together rules** | ❌ | ✅ |
| **Balanced grouping algorithms** | ❌ | ✅ |
| **Group history (who worked together)** | ❌ | ✅ |
| **Save group configurations** | ❌ | ✅ |
| **Export groups (PDF/print)** | ❌ | ✅ |
| **Integration with Seating Organiser** | ❌ | ✅ |

### **4. Other Free Tools (Pro Enhancements)**

| Tool | Free Features | Pro Enhancements |
|------|---------------|------------------|
| **Name Picker** | Random selection, tracking | Cloud sync lists, multiple classes, selection history reports, "fair pick" algorithm ensuring everyone gets called |
| **Timers** | Basic countdown, sounds | Save presets, cloud sync, Dayboard integration (auto-start timers per block) |
| **Wheel Spinner** | Custom segments, spin | Save wheels, cloud sync, weighted probabilities, history tracking |
| **Seating Organiser** | Drag-drop, rules | Cloud sync, multiple layouts, auto-generate with Group Picker rules, term history |
| **Noise Meter** | Visual display, threshold | Cloud sync settings, historical noise data, Dayboard integration (noise by subject) |

---

## 📊 Dashboard Design

### **Dashboard Home (Landing After Login):**

```
┌─────────────────────────────────────────────────────────────┐
│  TebTally Pro                    [Profile] [Settings] [Help] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Good morning, Ms. Johnson! 👋                               │
│  Monday, November 15, 2025                                   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Current Block│  │ Energy Level │  │ This Week    │      │
│  │              │  │              │  │              │      │
│  │  📚 Reading  │  │  😊 High (8) │  │  28 blocks   │      │
│  │  9:00-10:00  │  │              │  │  6.2 avg     │      │
│  │  [View]      │  │  [Log Now]   │  │  energy      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  Quick Actions:                                              │
│  [📺 Display Mode] [👥 Pick Groups] [🎲 Random Name]        │
│                                                               │
│  Today's Schedule:                                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  9:00  📚 Reading              [NOW] ▓▓▓▓▓░░░ 60%    │   │
│  │ 10:00  🧮 Math                                        │   │
│  │ 11:00  🍎 Snack Break                                 │   │
│  │ 11:30  🎨 Art                                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Recent Activity:                                            │
│  • Energy log: High (8) at 9:15am                           │
│  • Created Math groups (4 groups of 6)                      │
│  • Updated Tuesday schedule                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Sidebar Navigation:**

```
┌──────────────────┐
│  🏠 Dashboard    │
│  📅 Dayboard     │
│  ⚡ Energy Dial  │
│  👥 Groups       │
│  🎯 Name Picker  │
│  ⏱️  Timers      │
│  🪑 Seating      │
│  📊 Noise Meter  │
│  🎡 Wheel        │
│  🎲 Dice/Coin    │
│  ─────────────   │
│  📈 Analytics    │
│  🔗 Integrations │
│  ⚙️  Settings    │
└──────────────────┘
```

---

## 🗄️ Data Model & Database Schema

### **Core Tables:**

**users**
```sql
id: uuid (primary key)
email: string
name: string
avatar_url: string
subscription_status: enum (free, pro, cancelled)
subscription_id: string (Stripe)
created_at: timestamp
last_login: timestamp
```

**classes**
```sql
id: uuid (primary key)
user_id: uuid (foreign key → users)
name: string (e.g., "5th Grade - Room 12")
grade_level: string
school_year: string (e.g., "2025-2026")
color: string (hex code)
is_active: boolean
created_at: timestamp
```

**students**
```sql
id: uuid (primary key)
class_id: uuid (foreign key → classes)
name: string
properties: jsonb (reading level, special needs, etc.)
seat_preference: string
created_at: timestamp
```

**dayboard_schedules**
```sql
id: uuid (primary key)
class_id: uuid (foreign key → classes)
day_of_week: enum (monday, tuesday, wednesday, thursday, friday)
blocks: jsonb (array of schedule blocks)
updated_at: timestamp
```

**dayboard_templates**
```sql
id: uuid (primary key)
user_id: uuid (foreign key → users)
name: string (e.g., "Regular Week", "Assessment Week")
schedule: jsonb (full week schedule)
created_at: timestamp
```

**energy_logs**
```sql
id: uuid (primary key)
class_id: uuid (foreign key → classes)
level: integer (1-10)
timestamp: timestamp
notes: text
block_id: uuid (optional - links to schedule block)
```

**groups**
```sql
id: uuid (primary key)
class_id: uuid (foreign key → classes)
name: string (e.g., "Math Groups - Nov 15")
configuration: jsonb (groups, students, rules)
created_at: timestamp
```

**seating_layouts**
```sql
id: uuid (primary key)
class_id: uuid (foreign key → classes)
name: string
layout: jsonb (desk positions, students)
created_at: timestamp
is_active: boolean
```

---

## 🔗 Cross-Tool Integrations

### **Dayboard ↔ Energy Dial**
- Log energy directly from display mode
- Show energy widget in TV display corner
- Color-code schedule blocks by historical energy
- Analytics: "Math at 2pm always shows Low energy"

### **Dayboard ↔ Group Picker**
- Click schedule block → "Generate groups for this block"
- Save group config per subject
- Display mode shows: "Today's Math Groups: [View]"

### **Dayboard ↔ Timers**
- Auto-start timer when block begins
- Display mode shows countdown to next block
- Transition timer between blocks

### **Group Picker ↔ Seating Organiser**
- Generate seating chart from group configuration
- Keep-apart rules apply to both
- View seating + groups side-by-side

### **Energy Dial ↔ Seating Organiser**
- Track energy by seating position
- "Students near window have lower energy"
- Suggest rearrangement

---

## 📱 User Experience Flow

### **New User Onboarding:**

1. **Landing Page** → "Try Free Tools" vs "Go Pro"
2. **Sign Up** → Email or Google OAuth
3. **Welcome Wizard:**
   - "What grade do you teach?"
   - "Import your schedule?" (upload or manual entry)
   - "Add your students?" (bulk import or skip)
   - "Take a tour?" (guided walkthrough)
4. **Dashboard** → Quick start guide overlay

### **Daily Workflow:**

**Morning (7:30 AM):**
- Teacher opens TebTally Pro
- Dashboard shows: "Today is Monday - 6 blocks scheduled"
- Clicks "📺 Display Mode" → projects on classroom TV
- Display shows: clock, current block, full schedule

**During Class (9:00 AM):**
- Display automatically highlights "Reading 9:00-10:00"
- Progress bar fills as time passes
- Teacher clicks "Log Energy" → quick 1-10 slider
- Display updates with energy indicator

**Transition (10:00 AM):**
- Display shows "Next: Math" preview
- Optional: Transition timer (2 minutes)
- Optional: Auto-group students for Math

**Planning (3:30 PM):**
- Teacher opens Dayboard
- Edits Wednesday schedule (assembly)
- Saves as template "Assembly Week"
- Exports PDF for substitute teacher

---

## 🎨 Premium Feature Details

### **1. Weekly Templates**

**How it works:**
- Save current week schedule as template
- Name it (e.g., "Regular Week", "Testing Week", "Short Week")
- Load template with one click
- Apply to different classes
- Share templates with other teachers (future)

**UI:**
```
Dayboard > Templates
┌────────────────────────────────┐
│ My Templates         [+ New]   │
├────────────────────────────────┤
│ ⭐ Regular Week               │
│   Used 12 times                │
│   [Load] [Edit] [Delete]       │
│                                 │
│ 📝 Assessment Week            │
│   Used 3 times                 │
│   [Load] [Edit] [Delete]       │
│                                 │
│ 🎉 Holiday Week (Short)       │
│   Used 2 times                 │
│   [Load] [Edit] [Delete]       │
└────────────────────────────────┘
```

### **2. Drag-and-Drop Scheduling**

**How it works:**
- Visual timeline view (vertical or horizontal)
- Drag blocks to reorder
- Resize blocks by dragging edges
- Drag block to another day to move
- Snap to time increments (5min, 15min, 30min)

**Technical:**
- React DnD Kit or react-beautiful-dnd
- Real-time validation (no overlaps)
- Auto-save on drop

### **3. Special Events & Exceptions**

**How it works:**
- Mark specific date with event
- Event types: Assembly, Field Trip, Guest Speaker, Holiday, Testing
- Event can replace schedule or add to it
- Calendar view shows events
- Display mode shows event banner

**Example:**
```
Tuesday, Nov 19 - Regular schedule
+ Special Event: "Fire Drill at 10:30 AM"

Display shows:
🚨 Fire Drill at 10:30 AM today
```

### **4. Multi-Class Support**

**How it works:**
- Create multiple classes (e.g., "Period 1 Math", "Period 5 Science")
- Quick switcher in header
- Each class has own schedule, students, settings
- Dashboard shows all classes at once

**UI:**
```
Header: [Period 1 Math ▼]
Dropdown:
  - Period 1 Math (current)
  - Period 3 English
  - Period 5 Science
  - Homeroom
  - + Add Class
```

### **5. Analytics Dashboard**

**Metrics:**
- Time allocation per subject (pie chart)
- Energy patterns over time (line graph)
- Most/least energetic subjects
- Most/least energetic times of day
- Schedule consistency (how often it changes)
- Student grouping patterns (who works together most)

**UI:**
```
Analytics > Overview
┌──────────────────────────────────────┐
│ This Month - November 2025           │
├──────────────────────────────────────┤
│                                       │
│  Time by Subject:                    │
│  ┌─────────────────────────────────┐ │
│  │     📚 Reading    8.5 hrs (35%) │ │
│  │     🧮 Math       6.2 hrs (26%) │ │
│  │     🔬 Science    4.8 hrs (20%) │ │
│  │     🎨 Art        3.1 hrs (13%) │ │
│  │     ⚽ PE         1.5 hrs (6%)  │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Energy Trends:                      │
│  [Line graph: Week 1-4, avg 6.5]    │
│                                       │
│  Insights:                           │
│  • Math energy drops 15% after lunch│
│  • Reading is most consistent (±0.8)│
│  • Friday afternoons need boost     │
└──────────────────────────────────────┘
```

---

## 🚀 Development Phases

### **Phase 1: Foundation (Month 1-2)**
**Goal:** Set up Pro infrastructure and migrate 2 core tools

**Tasks:**
- Set up **Neon PostgreSQL** database with Prisma ORM
- Set up **NextAuth.js** with Google OAuth as primary provider
- Build Pro dashboard shell (navigation, routing, layouts)
- Create database schema (users, classes, students, schedules, logs)
- Implement authentication flows (sign in, sign out, session management)
- Build subscription system with **Stripe** (checkout, webhooks, customer portal)
- Set up **Vercel** deployment with environment variables
- Migrate Dayboard to Pro with cloud sync (save to Neon instead of localStorage)
- Migrate Energy Dial to Pro with cloud sync
- Basic settings page (profile, subscription management, danger zone)

**Deliverable:** Users can sign up with Google, subscribe via Stripe, and use Dayboard Pro + Energy Dial Pro with cloud sync across devices

---

### **Phase 2: Enhanced Dayboard (Month 3)**
**Goal:** Add premium Dayboard features

**Tasks:**
- Weekly templates (save/load)
- Edit blocks (modal form)
- Special events & exceptions
- Multi-class support
- PDF export
- Color coding by subject
- Block notes/descriptions

**Deliverable:** Dayboard Pro has all premium features listed in matrix

---

### **Phase 3: Enhanced Energy Dial (Month 4)**
**Goal:** Add premium Energy Dial features

**Tasks:**
- Unlimited history
- Monthly/yearly trend graphs
- Energy by subject correlation
- Energy by time patterns
- Export reports (PDF/CSV)
- Notes per energy log
- Recommendations engine

**Deliverable:** Energy Dial Pro has all premium features + basic analytics

---

### **Phase 4: Group Picker Pro (Month 5)**
**Goal:** Migrate and enhance Group Picker

**Tasks:**
- Cloud sync student lists
- Multiple class rosters (links to classes table)
- Student properties system
- Keep-apart/keep-together rules
- Balanced grouping algorithms
- Group history tracking
- Save group configurations
- Export groups (PDF)

**Deliverable:** Group Picker Pro fully featured

---

### **Phase 5: Cross-Tool Integrations (Month 6)**
**Goal:** Make tools work together

**Tasks:**
- Dayboard → Energy Dial integration (widget, quick log)
- Dayboard → Group Picker integration (generate groups from block)
- Dayboard → Timer integration (auto-start)
- Group Picker → Seating integration
- Display mode enhancements (energy widget, groups view)

**Deliverable:** Tools feel unified, not siloed

---

### **Phase 6: Analytics & Insights (Month 7)**
**Goal:** Build analytics dashboard

**Tasks:**
- Time allocation analytics
- Energy pattern analytics
- Grouping pattern analytics
- Insights engine (AI recommendations)
- Export all data (CSV)
- Dashboard home stats widgets

**Deliverable:** Analytics tab with actionable insights

---

### **Phase 7: Remaining Tools (Month 8-9)**
**Goal:** Migrate all other free tools to Pro

**Tasks:**
- Name Picker Pro (cloud sync, history, fair pick)
- Timers Pro (presets, Dayboard integration)
- Seating Organiser Pro (cloud sync, layouts, integration)
- Noise Meter Pro (history, analytics)
- Wheel Spinner Pro (saved wheels, weighted)
- Dice/Coin Pro (cloud sync if needed)

**Deliverable:** All 11 free tools have Pro versions

---

### **Phase 8: Polish & Launch (Month 10)**
**Goal:** Production-ready TebTally Pro

**Tasks:**
- Mobile responsive (all screens)
- Dark mode / custom themes
- Onboarding flow refinement
- Help documentation
- Video tutorials
- Bug fixes & performance optimization
- Beta testing with 10-20 teachers
- Launch marketing site page

**Deliverable:** Public launch of TebTally Pro

---

### **Phase 9: Future Integrations (Month 11+)**
**Goal:** Connect to external apps

**Tasks:**
- SpellTally integration (launch test from Dayboard)
- TrackTally integration (incident dots on schedule)
- WritingTally integration (writing block reminders)
- Google Classroom sync
- Canvas/Schoology integration
- Parent portal (view-only schedule sharing)

**Deliverable:** TebTally Pro becomes central hub for all classroom tools

---

## 🔐 Technical Considerations

### **Authentication:**
- **NextAuth.js v5 (Auth.js)** handles all authentication flows
- **Google OAuth** as primary sign-in method (teachers already have Google accounts)
- Email/password as secondary option with email verification
- Future: Microsoft OAuth (some schools use Office 365)
- Session management with secure httpOnly cookies and JWT
- Password reset flow using email magic links
- CSRF protection built-in with NextAuth.js

### **Authorization:**
- Database-level access control using Prisma middleware
- API routes validate user session before data access
- Users can only access their own data (user_id foreign key checks)
- Middleware on protected routes ensures authentication
- Future: Team/school accounts with role-based access control (RBAC)

### **Data Migration:**
- Free → Pro migration path for localStorage data
- Export from free tool → Import to Pro
- One-time migration wizard on first Pro login

### **Performance:**
- Server-side rendering for fast initial load
- React Query for caching API responses
- Optimistic updates for instant UI feedback
- Lazy loading for tools (code splitting)
- Image optimization

### **Offline Support:**
- Service worker for offline functionality
- Local cache with sync on reconnect
- Conflict resolution for offline edits
- Display mode works offline (cached schedule)

### **Mobile:**
- Responsive design (works on tablets)
- Native app? (Future - React Native or PWA)
- Optimized for iPad (teachers often use iPads)

### **Testing:**
- Unit tests (Jest + React Testing Library)
- Integration tests (Playwright)
- E2E tests for critical flows (signup, subscribe, save schedule)

---

## 📦 Deliverables Summary

**By end of Phase 8 (10 months):**

✅ TebTally Pro web app with:
- Authentication & user accounts
- Subscription system (Stripe)
- Dashboard with overview stats
- 11 enhanced tools with cloud sync
- Cross-tool integrations
- Analytics & insights
- Multi-class support
- Export capabilities (PDF, CSV)
- Mobile responsive
- Documentation & tutorials

**Migration path:**
- Free tools remain free (no changes)
- Users can upgrade anytime
- Data export from free → import to Pro

---

## 🎯 Success Metrics

**Technical:**
- 99.9% uptime
- < 2s page load time
- < 500ms API response time
- Zero data loss
- < 1% bug rate

**Product:**
- 30% of free tool users visit Pro landing page
- 10% free → Pro conversion rate (Month 1)
- 80% retention after Month 1
- 60% retention after Month 6
- < 5% churn rate monthly

**Business:**
- 1,000 Pro subscribers by Month 12
- 5,000 Pro subscribers by Month 24
- $7-12 ARPU (average revenue per user/month)
- LTV > 12 months (lifetime value)

---

## 💡 Next Steps

1. **Validate with teachers** - Show this plan to 5-10 teachers, get feedback
2. **Prioritize features** - Rank features by value vs effort
3. **Set pricing** - Research competitor pricing, determine tiers
4. **Build prototype** - Phase 1 foundation + basic Dayboard Pro
5. **Beta launch** - 20-50 teachers testing for free
6. **Iterate** - Refine based on real usage data
7. **Public launch** - Marketing campaign, content strategy
8. **Scale** - Grow user base, add features based on demand
