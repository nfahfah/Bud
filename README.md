# Bud 🌱

## Project Scope

**One-sentence version:**  
Bud is a simple web app that lets users register, log in, and add each other as buddies to stay connected.

**Longer description:**  
Bud is a lightweight web application built using React and Firebase that allows users to register, log in, and add friends (buddies) using unique user IDs. Once logged in, users can add their buddies and view a dashboard with their buddy list. The goal is to create a minimal social feature set that supports basic user interaction through buddy connections.

---

## Level of Achievement

**Completion Level:**  
Reached the **Basic Tier** of Orbital's achievement levels with additional stretch goals like buddy lookup using custom user IDs and Firebase integration.

---

## 📍 Milestone 1: Ideation

### Problem Motivation

In many apps, staying connected with specific people (buddies) often involves clunky usernames or hard-to-find profiles. Bud aims to simplify this by letting users register with a custom user ID and then connect directly via that ID.

### Proposed Core Features / User Stories

- A user can register with an email, password, and custom user ID.
- A user can log in using their email and password.
- After logging in, a user can add a buddy by entering the buddy's user ID.
- The system stores user data and connections securely using Firebase Authentication and Firestore.

### Design & Plan

**Tech Stack:**
- React for frontend UI
- Firebase for backend authentication and database
- React Router for page navigation

**Page Flow:**
- `RegisterPage`: Create an account with email, password, and custom user ID.
- `LoginPage`: Log in with email and password.
- `DashboardPage`: View dashboard with option to add buddies.
- `AddBuddyPage`: Enter a buddy’s user ID to connect.

---

## Project Setup

To run this project locally:

```bash
git clone git@github.com:nfahfah/Bud.git
cd Bud
npm install
npm start

