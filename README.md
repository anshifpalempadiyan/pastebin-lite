# Pastebin Lite

A simple Pastebin-like application built with Next.js that allows users to create text pastes and share them via a unique URL. Pastes can optionally expire based on time (TTL) or view-count limits.

This project was built as a take-home assignment and is designed to pass automated grading.

---

## Features

- Create a paste containing arbitrary text
- Receive a shareable URL for each paste
- View pastes via a browser-friendly HTML page
- Optional time-based expiry (TTL)
- Optional view-count limits
- Deterministic time handling for automated testing

---

## Tech Stack

- Next.js (App Router)
- Node.js
- MongoDB Atlas (persistence layer)

---

## Running the App Locally

### 1. Install dependencies
```bash
npm install
