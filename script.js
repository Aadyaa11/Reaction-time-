<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reaction Time Tester with AI Feedback</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background: #f0f0f0;
      margin: 0;
      padding: 50px;
    }

    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      padding: 30px;
      max-width: 400px;
      margin: auto;
    }

    .light {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 20px auto;
      background-color: grey;
      transition: background-color 0.3s;
    }

    .red {
      background-color: red;
    }

    .green {
      background-color: green;
    }

    button {
      padding: 10px 20px;
      font-size: 18px;
      margin: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    #goBtn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    #result, #feedback {
      font-size: 20px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reaction Time Tester</h1>
    <div id="light" class="light red"></div>
    <button id="startBtn">Start</button>
    <button id="goBtn" disabled>GO!</button>
    <p id="result"></p>
    <p id="feedback"></p>
    <p><small>(You can press the spacebar instead of clicking “GO!”)</small></p>
  </div>

  <script>
    const startBtn = document.getElementById("startBtn");
    const goBtn = document.getElementById("goBtn");
    const light = document.getElementById("light");
    const result = document.getElementById("result");
    const feedback = document.getElementById("feedback");

    let greenTime = 0;
    let timeoutId = null;
    let hasClicked = false;

    function reset() {
      clearTimeout(timeoutId);
      greenTime = 0;
      hasClicked = false;
      light.className = "light red";
      result.textContent = "";
      feedback.textContent = "";
      goBtn.disabled = true;
    }

    function triggerReaction() {
      const now = Date.now();

      if (hasClicked) return;
      hasClicked = true;

      if (greenTime === 0) {
        clearTimeout(timeoutId);
        result.textContent = "Too soon! You clicked before the light turned green.";
        feedback.textContent = "Try again and wait for green.";
        goBtn.disabled = true;
        return;
      }

      const reactionTime = now - greenTime;
      result.textContent = `Your reaction time: ${reactionTime} ms`;

      let aiFeedback = "";
      if (reactionTime < 200) {
        aiFeedback = "⚡ Lightning fast!";
      } else if (reactionTime < 350) {
        aiFeedback = "👍 Great job!";
      } else if (reactionTime < 500) {
        aiFeedback = "🙂 Not bad, but you can improve.";
      } else {
        aiFeedback = "🐢 Too slow! Were you distracted?";
      }

      feedback.textContent = aiFeedback;
      goBtn.disabled = true;
    }

    startBtn.onclick = () => {
      reset();

      const delay = Math.floor(Math.random() * 3000) + 2000;

      timeoutId = setTimeout(() => {
        light.className = "light green";
        greenTime = Date.now();
        goBtn.disabled = false;
      }, delay);
    };

    goBtn.onclick = () => {
      triggerReaction();
    };

    // Spacebar key event
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space" && !goBtn.disabled) {
        event.preventDefault(); // prevent page scroll
        triggerReaction();
      }
    });
  </script>
</body>
</html>

