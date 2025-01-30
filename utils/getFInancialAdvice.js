import { GoogleGenerativeAI } from "@google/generative-ai";
 
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_API_KEY);

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
     // Calling Gemini API model to get financial advice
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
        Here is the user's financial data for this month:
        - Total Budget: ₹${totalBudget}
        - Total Expenses: ₹${totalSpend}
        - Total Income: ₹${totalIncome}

        The user is struggling to save money and would like advice on how to reduce expenses and allocate funds more effectively . 
        Give about 2-5 lines of financial advice can you provide to help the user better manage their expenses`;

   
    const result = await model.generateContentStream(prompt);
    let fullAdvice = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullAdvice += chunkText;
    }
    return fullAdvice;
  } catch (error) {
    if (error.message.includes("503")) {
      return "The service is currently overloaded. Please try again later.";
    }
    else{
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
    }
  }
};

export default getFinancialAdvice;
