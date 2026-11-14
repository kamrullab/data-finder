<div align="center">

# 🔎 Specific Data Finder

### Fast, private, local text-file search for large datasets

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

[![Repository](https://img.shields.io/badge/GitHub-kamrullab%2Fdata--finder-181717?style=flat-square&logo=github)](https://github.com/kamrullab/data-finder)
[![Local First](https://img.shields.io/badge/Privacy-Local--First-8b5cf6?style=flat-square&logo=shield&logoColor=white)](#-privacy-and-security)
[![Streaming Search](https://img.shields.io/badge/Search-Streaming-06b6d4?style=flat-square&logo=lightning&logoColor=white)](#-features)
[![Responsive](https://img.shields.io/badge/UI-All--Device_Responsive-f97316?style=flat-square&logo=responsive&logoColor=white)](#-responsive-design)

</div>

> [!CAUTION]
> **LOCAL USE ONLY:** This repository is intended only for private, local use with XAMPP or another local PHP server. Do not deploy or expose it on a live/public server. The demo password is visible in the client-side source and is not production-grade authentication.

## 📖 About

**Specific Data Finder** is a lightweight local web application that searches matching lines across large `.txt` files. PHP scans files line by line and streams results to the browser, avoiding browser freezes and high memory usage caused by loading entire files at once.

It is designed exclusively for local use with XAMPP. Data remains inside the local `DATA FILE` directory and is excluded from Git. This project is not intended for live hosting or public-server deployment.

## 🔑 Demo Access

Use the following password on the login screen:

<div align="center">

### Password: `143`

[![Demo Password](https://img.shields.io/badge/Demo_Password-143-ef4444?style=for-the-badge&logo=key&logoColor=white)](#-demo-access)

</div>

> [!NOTE]
> This password is intentionally public and is provided only for local/demo access. It is not intended to protect a production deployment.

## ✨ Features

- ⚡ Line-by-line PHP streaming for large text files
- 📊 Live byte-based search progress with percentage
- 🔤 Case-insensitive matching
- 📄 Searches every `.txt` file directly inside `DATA FILE`
- 💾 Downloads matching results as a text file
- 🧠 Low browser-memory usage
- 📱 Responsive desktop and mobile interface
- 🔒 Local-first workflow—real data files are ignored by Git
- 🎨 Local SVG favicon and clean interface

## 📱 Responsive Design

The interface automatically adapts to different screen sizes and is designed to work across:

| Device | Support |
|---|:---:|
| 🖥️ Desktop | ✅ Responsive |
| 💻 Laptop | ✅ Responsive |
| 📱 Tablet | ✅ Responsive |
| 📲 Mobile | ✅ Responsive |

Search fields, progress indicators, result cards and action buttons resize and wrap for the available screen width. No separate mobile application is required.

## 🛠️ Requirements

- [XAMPP](https://www.apachefriends.org/) or another PHP-enabled web server
- PHP 8.0 or newer recommended
- A modern browser such as Chrome, Edge, or Firefox

## 🚀 Installation

1. Clone the repository inside the XAMPP `htdocs` directory:

   ```bash
   git clone https://github.com/kamrullab/data-finder.git
   ```

2. Start **Apache** from the XAMPP Control Panel.

3. Open the application using your configured Apache port. For this project's local configuration:

   ```text
   http://localhost:8081/db/
   ```

4. Place the `.txt` files you want to search directly inside:

   ```text
   DATA FILE/
   ```

5. Enter a search term and select **Get Data**.

> [!IMPORTANT]
> Files inside subfolders are intentionally ignored. Move only the files you currently need into the root `DATA FILE` directory.

## 📁 Project Structure

```text
data-finder/
├── DATA FILE/          # Local searchable files (real data ignored by Git)
│   └── demo.text       # Safe placeholder that keeps the folder in Git
├── index.html          # Login and main search interface
├── data.html           # Standalone search interface
├── script.js           # Streaming UI, progress, search and download logic
├── search-data.php     # Memory-efficient line-by-line search endpoint
├── list-files.php      # Lists root-level .txt files
├── styles.css          # Responsive styling
├── favicon.svg         # Local application icon
├── .htaccess           # Development cache-control rules
└── .gitignore          # Prevents real text data from being committed
```

## 🔍 How Search Works

```text
Search term
    ↓
Browser requests search-data.php
    ↓
PHP scans root-level .txt files line by line
    ↓
Matches and progress stream to the browser
    ↓
Results appear without loading whole files into browser memory
```

The application searches only files immediately inside `DATA FILE`. Files can remain organized in subfolders until they are manually moved into the root folder for a search.

## 💾 Saving Results

Select **Save Data** to run the search and download the displayed matching lines. The download filename is based on the search term.

## 🔐 Privacy and Security

- Real `.txt` data files are excluded through `.gitignore`.
- `DATA FILE/demo.text` contains sample content only.
- Search processing happens on the local PHP server.
- Do not expose this development application directly to the public internet.
- The browser-side password gate is intended only as a convenience for local use, not as production authentication.

## ⚙️ Configuration

If Apache uses a different port or folder name, adjust the local URL accordingly:

```text
http://localhost:<PORT>/<FOLDER>/
```

The search endpoint automatically detects root-level `.txt` files, so no file manifest needs to be updated.

## 🤝 Contributing

Issues and pull requests are welcome. Never include private or production data in commits, issues, screenshots, or sample files.

## 📜 License

Distributed under the [MIT License](LICENSE).

---

<div align="center">

Made for fast local data searching · [View Repository](https://github.com/kamrullab/data-finder)

</div>
