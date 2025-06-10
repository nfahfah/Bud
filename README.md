# Bud – A Study Buddy Platform

## 🌟 Level of Achievement

**Project Gemini** (aiming for a complete and fully functional web platform with extended features).

---

##  Project Scope

Bud is a web-based productivity platform designed to help university students manage their academic workload while staying motivated through peer accountability. Students can log tasks, track their progress, connect with study buddies, and share resources to build a collaborative and supportive study environment. hello

---

##  Milestone 1: Ideation

### Problem Motivation:
University students often face stress and burnout. Many tools focus solely on productivity, neglecting the social support that boosts motivation. Bud bridges this gap by promoting task tracking *and* buddy-based accountability.

### Proposed Core Features / User Stories:
- As a user, I can register/login securely to access my personalized dashboard.
- As a user, I can connect with a study buddy to share our progress.
- As a user, I can create subject-based to-do lists and track my study tasks.
- As a user, I want to feel motivated by seeing my buddy’s study progress too.

### Design Plan:
#### Architecture Overview:
| Layer       | Technology          |
|------------|---------------------|
| Frontend   | React, Tailwind CSS |
| Backend    | Firebase (Auth + DB)|
| Database   | Firestore           |
| Hosting    | Vercel/Firebase     |

####  Features Completed:
- **Feature 1 (Level 1):** User registration and data stored in Firebase
- **Feature 2 (Level 1):** Users can add a buddy (another registered user)


####  Implementation:
- **Frontend:** Simple React UI with basic HTML forms to:
  - Register/Login
  - Add a buddy
- **Backend:** Firebase integration to:
  - Store user accounts and buddy relationships
  - Accept and store task data in Firestore
  - Retrieve and display the list of tasks in real time

---

##  Milestone 2: Prototyping

Expanded task management features with prioritization and progress tracking.

####  Features:
- **Feature 3 (Level 2):** Add/Edit/Delete tasks, and track their status (e.g. "In Progress", "Completed")
- **Feature 4 (Level 1):** Prioritization tags based on task deadline and urgency
- **Feature 6 (Level 1):** Due date visualization and reminders based on priority
- **Feature 7 (Level 1):** Progress tracking displayed per task

####  Implementation:
- **Frontend:** Enhanced UI to:
  - Display tasks with due dates, priorities, and completion toggles
  - Visual indicators (colors/tags) for task priority
- **Backend:** Firebase support for:
  - Updating task status
  - Deleting and editing tasks
  - Storing priority and completion status

---

##  Milestone 3: Refinement

Fully integrated system with additional resource sharing and buddy-based motivation features.

####  Features Completed:
- **Feature 5 (Level 1):** Users can upload/share notes or links with their buddies
- **Feature 7 (Level 2):** Overall user progress summary displayed
- **Feature 7 (Level 3):** Visual comparison of personal and buddy’s progress

####  Implementation:
- **Frontend:** 
  - Progress dashboard with:
    - Today's tasks
    - User progress bar
    - Buddy progress bar
  - Resource sharing UI (upload file/add link)
- **Backend:**
  - Store and retrieve shared resources
  - Compute and display user/buddy progress summaries
  - Basic logic for sharing and viewing buddy data


---

## 💻 Technical Proof of Concept

We successfully implemented an integrated frontend (React) and backend (Firebase) with:

- ✅ **Register Page** using Firebase Auth
- ✅ **Login Page** using Firebase Auth
- ✅ **Dashboard Display** 
- ✅ **Buddy Connect** via friend’s userID

---

## Folder Structure

bud-app/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ ├── index.js
├── .gitignore
├── README.md
├── package.json


---

## How to Run the Project
To run this project locally:

git clone git@github.com:nfahfah/Bud.git
cd Bud
npm install
npm start

