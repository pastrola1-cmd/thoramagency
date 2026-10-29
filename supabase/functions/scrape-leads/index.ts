declare const Deno: any;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const testUrl = "https://www.businesslist.com.ng/category/schools/city:abuja";
    const res = await fetch(testUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });
    const html = await res.text();
    return new Response(JSON.stringify({
      status: "ok",
      fetchStatus: res.status,
      htmlLength: html.length,
      sample: html.slice(0, 300)
    }), { headers: CORS_HEADERS });
  } catch (err: any) {
    return new Response(JSON.stringify({ status: "error", error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
});
