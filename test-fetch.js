async function run() {
  const res = await fetch("https://amc-soluciones-peru.vercel.app/api/products/amc-9100");
  const json = await res.json();
  console.log("Summary length:", json.data.summary.length);
  console.log("Summary ending:", json.data.summary.slice(-50));
}
run();
