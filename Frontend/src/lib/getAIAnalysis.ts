const getAIAnalysis = async (data: unknown, userAddress: string) => {
  const now = Date.now();
  const cached = JSON.parse(localStorage.getItem(userAddress));

  // Check cache expiration (10 minutes)
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  try {
    const parsedBody = JSON.stringify(data);
    const response = await fetch(import.meta.env.VITE_N8N_API, {
      method: "POST",
      body: parsedBody,
      headers: {
        Authorization: import.meta.env.VITE_N8N_AUTH,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });

    const result = await response.json();

    // Cache result with expiration
    localStorage.setItem(
      userAddress,
      JSON.stringify({
        data: result,
        expiresAt: now + 10 * 60 * 1000, // 10 minutes
      })
    );

    return result;
  } catch (e) {
    console.error("AI Analysis Error:", e);
    return null;
  }
};

export default getAIAnalysis;
