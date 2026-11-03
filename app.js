const blogList = document.getElementById("blogList");
const statusText = document.getElementById("status");

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

async function loadBlogs() {
  try {
    const response = await fetch("/api/blogs");
    const blogs = await response.json();
    if (!response.ok) throw new Error(blogs.message || "Unable to load blogs.");
    statusText.textContent = blogs.length ? "" : "No blog posts yet. Sign in and publish the first one!";
    blogList.innerHTML = blogs.map(blog => `
      <article class="blog-card">
        <p class="meta">${safeText(blog.author?.name || "Unknown author")} · ${new Date(blog.createdAt).toLocaleDateString()}</p>
        <h3>${safeText(blog.title)}</h3>
        <p>${safeText(blog.content.slice(0, 150))}${blog.content.length > 150 ? "..." : ""}</p>
        <a href="/blog.html?id=${encodeURIComponent(blog._id)}">Read full blog →</a>
      </article>`).join("");
  } catch (error) {
    statusText.textContent = error.message + " Check that the server and MongoDB are running.";
  }
}
loadBlogs();