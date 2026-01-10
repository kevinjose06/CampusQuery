# CampusQuery – AI Powered College Helpdesk Chatbot

## 📌 Overview

CampusQuery is an AI-powered college helpdesk chatbot designed to provide students with instant, accurate, and college-specific information. It centralizes commonly scattered information such as attendance rules, exam registration details, fee deadlines, department information, events, and condonation procedures into a single conversational interface.

The system uses a rule-based knowledge layer combined with AI (Gemini) to generate clear, human-like responses. Supabase Edge Functions are used to securely connect the frontend with the database and AI services.

---

## 🎯 Objectives

* Reduce confusion caused by scattered notices and circulars
* Minimize workload on administrative staff
* Provide 24/7 access to academic and administrative information
* Deliver fast, accurate, and student-friendly responses

---

## ✨ Key Features

* 💬 AI-powered chat interface
* 📚 Attendance rules lookup (gender-wise)
* 📝 Exam registration & fee details
* 🎉 College events information
* 🏢 Department details
* 📄 Condonation procedure guidance
* 🔐 Secure backend using Supabase Edge Functions
* ⚡ Real-time responses

---

## 🛠️ Tech Stack

### Frontend

* React + TypeScript
* Vite
* Tailwind CSS
* ShadCN UI Components

### Backend

* Supabase (PostgreSQL)
* Supabase Edge Functions (Deno)

### AI

* Google Gemini API

### Tools & Platform

* Supabase Dashboard
* VS Code
* GitHub

---

## 🗂️ Database Structure (Example Tables)

* `attendance_rules`
* `exam_registration_fees`
* `events`
* `department_info`
* `condonation_rules`
* `exam_rules`

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd campusquery
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_publishable_api_key"
```

> Get these from: Supabase Dashboard → Settings → API

---

### 4. Supabase Edge Function Setup

In Supabase Dashboard:

1. Go to **Edge Functions**
2. Create a function named: `rapid-processor`
3. Add the provided `index.ts` code
4. Add secrets in **Edge Functions → Secrets**:

   * `SUPABASE_URL`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `GEMINI_API_KEY`
5. Click **Deploy**

---

### 5. Run the Project

```bash
npm run dev
# or
bun dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🔁 How It Works (Flow)

1. User enters a question in the chat UI
2. Frontend calls:

   ```ts
   supabase.functions.invoke('rapid-processor', { body: { query } })
   ```
3. Edge Function:

   * Parses the query
   * Fetches relevant data from Supabase tables
   * Sends formatted data to Gemini API
   * Returns AI response
4. Frontend displays the response

---

## 🔐 Security Notes

* Publishable key is used only in frontend
* Service role key is stored securely in Edge Function secrets
* RLS can be enabled for additional safety

---

## 🚀 Future Enhancements

* Admin panel for managing rules and events
* Multi-language support
* Student authentication
* Notification system
* Voice input

---

## 👥 Team

Developed by a team of 4 students as a hackathon project.

---

## 📄 License

This project is for educational and hackathon purposes.

---

## ❤️ Acknowledgements

* Supabase
* Google Gemini API
* Open-source community

---

## Screenshots and Demo video
![Home Page](C:\Users\angel\OneDrive\Pictures\Screenshots\1.png)
![Chat Page](C:\Users\angel\OneDrive\Pictures\Screenshots\2.png)
![Categories Page](C:\Users\angel\OneDrive\Pictures\Screenshots\3.png)
![About Page](C:\Users\angel\OneDrive\Pictures\Screenshots\4.png)
![Help Page](C:\Users\angel\OneDrive\Pictures\Screenshots\5.png)

#Demo URL

https://campusquery.vercel.app/


> *CampusQuery – One stop solution for all your campus queries* 🎓
