import { auth } from "@/auth";

export async function POST(request) {
  try {
    // Get the current user session
    const session = await auth();
    const userId = session?.user?.id;

    const { topic, difficulty, timeCommitment } = await request.json();

    if (!topic) {
      return Response.json({ error: "Topic is required" }, { status: 400 });
    }

    // Create the prompt for ChatGPT to generate a structured study plan
    const prompt = `Create a comprehensive study plan for the topic: "${topic}"

Requirements:
- Difficulty level: ${difficulty}
- Daily time commitment: ${timeCommitment}
- Generate exactly 10 subtopics that cover the topic comprehensively
- For each subtopic, provide 3-5 learning resources (mix of videos, articles, and quizzes)
- Include realistic time estimates for each subtopic
- Make sure the content is appropriate for ${difficulty} level learners
- Focus on practical, actionable learning materials

Please structure the response as a complete study plan with clear progression from basic concepts to more advanced topics.`;

    // Call ChatGPT API with structured schema
    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are an expert educational content creator who specializes in creating comprehensive, well-structured study plans. You understand different learning styles and can recommend appropriate resources for various skill levels.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        json_schema: {
          name: "study_plan",
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              description: {
                type: "string",
              },
              difficulty: {
                type: "string",
              },
              timeCommitment: {
                type: "string",
              },
              estimatedDuration: {
                type: "string",
              },
              subtopics: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    estimatedTime: {
                      type: "string",
                    },
                    resources: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                            enum: ["video", "article", "quiz"],
                          },
                          url: {
                            type: "string",
                          },
                          completed: {
                            type: "boolean",
                          },
                        },
                        required: [
                          "title",
                          "description",
                          "type",
                          "url",
                          "completed",
                        ],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: [
                    "title",
                    "description",
                    "estimatedTime",
                    "resources",
                  ],
                  additionalProperties: false,
                },
              },
            },
            required: [
              "title",
              "description",
              "difficulty",
              "timeCommitment",
              "estimatedDuration",
              "subtopics",
            ],
            additionalProperties: false,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(
        `ChatGPT API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response from ChatGPT API");
    }

    // Parse the structured response
    const studyPlan = JSON.parse(data.choices[0].message.content);

    // Ensure all resources start as not completed
    studyPlan.subtopics.forEach((subtopic) => {
      subtopic.resources.forEach((resource) => {
        resource.completed = false;
      });
    });

    // Add user ID if authenticated
    if (userId) {
      studyPlan.userId = userId;
    }

    return Response.json(studyPlan);
  } catch (error) {
    console.error("Error generating study plan:", error);
    return Response.json(
      { error: "Failed to generate study plan. Please try again." },
      { status: 500 },
    );
  }
}
