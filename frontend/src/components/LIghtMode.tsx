<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dark / Light Mode Demo</title>
  <style>
    /* Base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      transition: background 0.4s, color 0.4s;
    }

    .container {
      text-align: center;
      border-radius: 10px;
      padding: 30px;
      width: 320px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin-bottom: 15px;
    }

    /* Light theme */
    body.light {
      background: #f4f7fa;
      color: #222;
    }

    body.light .container {
      background: #fff;
    }

    /* Dark theme */
    body.dark {
      background: #121212;
      color: #f4f7fa;
    }

    body.dark .container {
      background: #1e1e1e;
    }

    /* Toggle switch */
    .toggle {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 32px;
      margin-top: 20px;
    }

    .toggle input {
      display: none;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      background-color: #ccc;
      border-radius: 34px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 24px;
      width: 24px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      border-radius: 50%;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #0078ff;
    }

    input:checked + .slider:before {
      transform: translateX(28px);
    }

    .mode-text {
      margin-top: 10px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dark / Light Mode</h1>
    <p>Toggle between light and dark themes easily.</p>

    <label class="toggle">
      <input type="checkbox" id="theme-toggle" />
      <span class="slider"></span>
    </label>
    <div class="mode-text" id="mode-text">Light Mode</div>
  </div>

  <script>
    const toggle = document.getElementById("theme-toggle");
    const modeText = document.getElementById("mode-text");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);
    toggle.checked = savedTheme === "dark";
    modeText.textContent = savedTheme === "dark" ? "Dark Mode" : "Light Mode";

    // Toggle theme
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
        modeText.textContent = "Dark Mode";
      } else {
        document.body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
        modeText.textContent = "Light Mode";
      }
    });
  </script>
</body>
</html>