async function fetchModel(url) {
  try {
    const response = await fetch(`http://localhost:8081${url}`);
    const body = await response.json();
    return body;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}
export default fetchModel;