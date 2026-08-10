import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
You are the official AI Customer Concierge for Jewellery Garden Pvt Ltd.
Your brand sells authentic 22KT / 18KT BIS Hallmarked Gold jewellery, certified diamond solitaires, and 925 Sterling Silver in India.

Key Store Information:
- Showrooms: Durgapur Bazar Showroom (Bazar Road, Durgapur) & Durgapur City Centre Showroom (Junction Mall Road, Durgapur).
- Phone Helpline: 1800-103-0017 | WhatsApp Support: +91 7605023222 | Email: support@jewellerygardenpvtltd.com
- Hallmarking: 100% BIS 916 Hallmarked Gold with 6-digit laser HUID numbers (verifiable on BIS Care App).
- Silver: 925 Sterling Silver bangles, gossip fashion jewellery, and 999 pure silver coins and utensils.
- Shipping: Free insured delivery across all PIN codes in India. Express delivery within 24-48 hours.
- Returns: 15-Day Money Back & Exchange guarantee with free insured door pickup.
- Price Breakup: Gold Rate × Weight + Making Charges (flat 20% discount) + 3% GST.

Instructions:
- Be polite, warm, and helpful like a luxury jewellery advisor.
- Keep answers concise and easy to read.
- Answer both general greetings (Hi, Hello, How are you) and jewellery technical questions.
- Always offer to assist further or suggest chatting on WhatsApp for live video trials.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if Google Gemini API key is configured
    if (process.env.GEMINI_API_KEY) {
      const result = await streamText({
        model: google("gemini-1.5-flash"),
        system: SYSTEM_PROMPT,
        messages,
      });

      return result.toTextStreamResponse();
    }

    // Smart Local Streaming Fallback when API key is pending configuration
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const q = lastUserMessage.toLowerCase();

    let reply = "Hello! I am Jewellery Garden's AI Assistant. How can I help you explore our 22KT Gold, Solitaire Diamonds, or 925 Sterling Silver collections today?";

    if (/^(hi|hello|hey|good morning|namaste)/.test(q)) {
      reply = "Hello! 😊 Welcome to Jewellery Garden Pvt Ltd. How can I assist you with your gold or silver shopping today?";
    } else if (q.includes("hallmark") || q.includes("gold") || q.includes("purity")) {
      reply = "Every gold piece at Jewellery Garden is 100% BIS 916 Hallmarked with a 6-digit laser-inscribed HUID number. You can verify your HUID on the official BIS Care App!";
    } else if (q.includes("silver") || q.includes("925")) {
      reply = "Our sterling silver collection features handcrafted 925 gossip silver bangles, chains, and 999 pure silver coins & utensils for puja and dining.";
    } else if (q.includes("durgapur") || q.includes("showroom") || q.includes("address")) {
      reply = "Our flagship showrooms are located at Durgapur Bazar (10:30 AM - 8:30 PM) and Durgapur City Centre (11:00 AM - 9:00 PM).";
    } else if (q.includes("return") || q.includes("refund")) {
      reply = "We offer a 15-Day hassle-free return and exchange guarantee with complimentary insured door pickup.";
    } else if (q.includes("price") || q.includes("rate") || q.includes("gst")) {
      reply = "Our pricing is 100% transparent: Live Gold Rate × Weight + Making Charges (flat 20% discount) + 3% GST with a tax invoice.";
    }

    return new Response(reply, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("AI Chat API Error:", error);
    return new Response("AI Chat Service temporarily unavailable.", { status: 500 });
  }
}
