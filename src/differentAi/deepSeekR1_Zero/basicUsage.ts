import dotenv from 'dotenv';

dotenv.config();
  async function main() {
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }
    
    console.log("API Key available:", !!openrouterApiKey);
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openrouterApiKey}`,
        // "HTTP-Referer": "https://www.google.com", // Optional. Site URL for rankings on openrouter.ai.
        // "X-Title": "Google", // Optional. Site title for rankings on openrouter.ai.
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-zero:free",
        "messages": [
          {
            "role": "user",
            "content": "What is the meaning of life?"
          }     
        ]
      })
    });

    const data = await response.json();
    console.log("Full response:", data);

    // Extract and display the actual text content
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      const messageContent = data.choices[0].message.content;
      console.log("\nResponse text:");
      console.log(messageContent);
    } else {
      console.log("Could not find text content in the response");
    }
  }


  main();