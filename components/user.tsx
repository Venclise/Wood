
async function getCurrentUser() {
  const res = await fetch("/api/me", { cache: "no-store" });
  const data = await res.json();
  console.log(data.user);
  return data.user;
}
