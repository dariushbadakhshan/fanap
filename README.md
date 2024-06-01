# fanap Next.js Project

Welcome to the **fanap** Next.js project repository. This repository contains an application built on the Next.js framework. This setup offers a streamlined development experience, facilitating code sharing, scalability, and robust project management.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Prerequisites](#prerequisites)
3.  [Setup](#setup)
4.  [Usage](#usage)
5.  [Launching the Application](#launching-the-application)
6.  [Folder Structure](#folder-structure)

## 👋 Introduction

This project is a web application developed using the Next.js framework. It aims to provide a modern and efficient platform for building dynamic and interactive web experiences. Next.js offers server-side rendering, automatic code splitting, and simplified routing, making it an ideal choice for building fast web applications.

## 🤔 Prerequisites

- Node.js version 20 or higher
- npm, yarn, bun or pnpm package manager 🤓

## 🛠️ Setup

To begin working with this project, follow these initial setup steps:

1.  **Clone the Repository**: Start by cloning this repository to your local development environment using the provided URL.

```bash
git clone git@github.com:dariushbadakhshan/fanap.git
```

2.  **Navigate to the Project Directory**: Move into the cloned directory to proceed with further setup.

```bash
cd fanap
```

3.  **Install Dependencies**: Execute the following command to install the project's dependencies.

```bash
npm install
yarn install
```

## 💻 Usage

Once the setup is complete, you can launch each application individually or concurrently.

## 🚀 Launching the Application

1.  **Copy the environment file**:
    Inside the root of project, there should be an **env.example** file. Copy this file.

```bash
cp env.example .env
```

This command copies the **env.example** file to the root of the repository and renames it to .env.

2.  **Start the development server**:

```bash
npm run dev
```

## 🗂️ Folder Structure

The project's folder structure adheres to a logical organization, promoting code reusability, maintainability, and ease of navigation:

```bash
fanap/
├── public/
│   ├── fonts/
│   │── images/
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── containers/
│   ├── helpers/
│   ├── models/
│   ├── services/
│   ├── shared/
│   ├── ui/
│__

```
