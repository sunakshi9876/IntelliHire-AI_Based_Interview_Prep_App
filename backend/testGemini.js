import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_MODEL = "gemini-2.5-pro";
const GEMINI_ACCESS_TOKEN = process.env.GEMINI_ACCESS_TOKEN;

if (!GEMINI_ACCESS_TOKEN) {
  console.error("Error: GEMINI_ACCESS_TOKEN is not set!");
  process.exit(1);
}

// Sample resume text
const resumeText = `
John Doe
Experience: 3 years in software development, skilled in Java, React, Node.js.
Education: B.Tech in IT, 2018.
Skills: Java, JavaScript, React, Node.js, SQL.
`;

async function testGemini() {
  try {
    const bodyPayload = {
      temperature: 0.7,
      maxOutputTokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this resume and provide a structured assessment:\n\n${resumeText}`
            }
          ]
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GEMINI_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(bodyPayload),
      }
    );

    console.log("HTTP Status:", response.status);

    const data = await response.json();
    console.log("Full API Response:", JSON.stringify(data, null, 2));

    const analysis = data?.candidates?.[0]?.content?.find(c => c.type === "text")?.text;
    console.log("Analysis Output:\n", analysis || "No analysis returned");
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
}

testGemini();
