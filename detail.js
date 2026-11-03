const detail = document.getElementById("blogDetail");
const id = new URLSearchParams(location.search).get("id");

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

async function loadDetail() {
  if (!id) { detail.textContent = "No blog ID was provided."; return; }
  try {
    const response = await fetch(`/api/blogs/${encodeURIComponent(id)}`);
    const blog = await response.json();
    if (!response.ok) throw new Error(blog.message);
    detail.innerHTML = `
      <p class="eyebrow">BLOG DETAILS</p>
      <h1>${safeText(blog.title)}</h1>
      <p class="meta">By ${safeText(blog.author?.name || "Unknown author")} · ${new Date(blog.createdAt).toLocaleString()}</p>
      <hr>
      <p>${safeText(blog.content).replace(/\n/g, "<br>")}</p>`;
  } catch (error) { detail.textContent = error.message || "Could not load this blog."; }
}
loadDetail();