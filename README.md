# 🎯 IELTS Momentum Engine

A clean, student-friendly React web application that keeps IELTS students motivated by showing predicted band score improvements based on daily task completion.

## Features

- **2-step workflow**: Profile setup → Daily dashboard
- **Real-time score prediction**: Checkboxes instantly update your predicted IELTS band score
- **Progress bar**: Visual progress toward target band score
- **Dynamic feedback**: Smart on-track / off-track messages
- **No backend required**: Pure React state
- **Mobile responsive**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Task Score Weights

| Task               | Band Score Gain |
| ------------------ | --------------- |
| Listening Practice | +0.05           |
| Reading Practice   | +0.05           |
| Writing Task       | +0.10           |
| Speaking Exercise  | +0.10           |
| **Max Daily Gain** | **+0.30**       |

## Tech Stack

- React 18
- Vite 5
- CSS Modules
- No external UI libraries
