import { GoogleGenerativeAI } from "@google/generative-ai";

export default class aiService {
    
    async getLesson(Category: string, subCategory: string, promptText: string): Promise<string> {
        
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
        אתה מורה מקצועי ומנוסה. התפקיד שלך הוא ליצור שיעור מקיף ומעניין בעברית.
        
        הנושא: ${promptText}
        קטגוריה: ${Category}
        תת-קטגוריה: ${subCategory}

        מבנה השיעור הנדרש:
        1. הסבר מפורט וברור על הנושא.
        2. נקודות מפתח חשובות שצריך לזכור.
        3. סעיף "מקורות נוספים" שיכלול:
           - לפחות 2 קישורים ישירים לסרטוני יוטיוב רלוונטיים (כותרת ולינק).
           - 2-3 קישורים לאתרים לימודיים אמינים (כמו ויקיפדיה, אתרי מדע או היסטוריה).
        
        אנא נסח את כל התשובה בעברית רהוטה והשתמש בפורמט Markdown (כותרות, בולטים וקישורים לחיצים).
        `;
        try {
        const result = await model.generateContent(prompt);
        return await result.response.text();
    }   catch (error) {
        console.error("שגיאה בפנייה ל-AI של גוגל:", error);
        throw new Error("לא ניתן היה ליצור את השיעור כרגע.");
    }
}

}


