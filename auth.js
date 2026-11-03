const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authMessage = document.getElementById("authMessage");
const writePanel = document.getElementById("writePanel");

document.getElementById("showLogin").addEventListener("click", () => {
  loginForm.classList.remove("hidden"); registerForm.classList.add("hidden");
  document.getElementById("showLogin").classList.add("active");
  document.getElementById("showRegister").classList.remove("active");
});
document.getElementById("showRegister").addEventListener("click", () => {
  registerForm.classList.remove("hidden"); loginForm.classList.add("hidden");
  document.getElementById("showRegister").classList.add("active");
  document.getElementById("showLogin").classList.remove("active");
});

registerForm.addEventListener("submit", async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm));
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)
    });
    const result = await response.json();
    authMessage.textContent = result.message;
    if (response.ok) {
      registerForm.reset();
      document.getElementById("showLogin").click();
    }
  } catch { authMessage.textContent = "Could not connect to the server."; }
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    sessionStorage.setItem("blogToken", result.token);
    sessionStorage.setItem("blogName", result.name);
    authMessage.textContent = `Welcome, ${result.name}!`;
    writePanel.classList.remove("hidden");
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
  } catch (error) { authMessage.textContent = error.message || "Could not connect to the server."; }
});

document.getElementById("blogForm").addEventListener("submit", async event => {
  event.preventDefault();
  const message = document.getElementById("blogMessage");
  const data = Object.fromEntries(new FormData(event.currentTarget));
  try {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {"Content-Type":"application/json", "Authorization":`Bearer ${sessionStorage.getItem("blogToken")}`},
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    message.textContent = "Blog published successfully! View it on the home page.";
    event.currentTarget.reset();
  } catch (error) { message.textContent = error.message || "Could not publish blog."; }
});

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("blogToken");
  sessionStorage.removeItem("blogName");
  location.reload();
});