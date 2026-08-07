import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CreateGoalDTO, ApiResponse } from '@you-il/types';

export async function breakdownGoal(req: Request, res: Response) {
  const { title, description, priority, mbti } = req.body as CreateGoalDTO;

  if (!title) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Goal title is required',
    };
    return res.status(400).json(errorResponse);
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Return mock insights if no key is configured
    const mockSuggestions = `[Mock Gemini Insight for ${mbti || 'P-System'}]: Since you have a lazy/Procrastinator streak, break "${title}" down into micro-steps of less than 5 minutes. Start with one simple task today!`;
    const successResponse: ApiResponse<{ insights: string }> = {
      success: true,
      data: { insights: mockSuggestions },
    };
    return res.status(200).json(successResponse);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analyze the following goal: "${title}" (${description || 'No description'}). The user's MBTI style is ${mbti || 'unknown (leaning lazy/procrastinator)'}. Provide actionable, hyper-practical micro-tasks tailored to their personality to beat procrastination. Keep it concise.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const successResponse: ApiResponse<{ insights: string }> = {
      success: true,
      data: { insights: text },
    };
    return res.status(200).json(successResponse);
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: error.message || 'Failed to communicate with AI model',
    };
    return res.status(500).json(errorResponse);
  }
}
