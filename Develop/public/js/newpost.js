const newPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-tech-post").value.trim();
  const content = document.querySelector("#content-tech-post").value.trim();

  if (title && content) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".new-post") // Corrected class name here
  .addEventListener("submit", newPost);
