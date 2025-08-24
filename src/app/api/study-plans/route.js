import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - List all study plans for the current user
export async function GET(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const offset = parseInt(url.searchParams.get("offset")) || 0;

    let studyPlans;

    if (userId) {
      // If user is authenticated, get their study plans
      studyPlans = await sql`
        SELECT 
          sp.id,
          sp.title,
          sp.description,
          sp.topic,
          sp.difficulty,
          sp.time_commitment,
          sp.estimated_duration,
          sp.created_at,
          sp.updated_at,
          COUNT(DISTINCT st.id) as subtopic_count,
          COUNT(DISTINCT r.id) as total_resources,
          COUNT(DISTINCT CASE WHEN r.completed = true THEN r.id END) as completed_resources
        FROM study_plans sp
        LEFT JOIN subtopics st ON sp.id = st.study_plan_id
        LEFT JOIN resources r ON st.id = r.subtopic_id
        WHERE sp.user_id = ${userId}
        GROUP BY sp.id, sp.title, sp.description, sp.topic, sp.difficulty, sp.time_commitment, sp.estimated_duration, sp.created_at, sp.updated_at
        ORDER BY sp.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      // If no user is authenticated, return sample/public study plans
      studyPlans = await sql`
        SELECT 
          sp.id,
          sp.title,
          sp.description,
          sp.topic,
          sp.difficulty,
          sp.time_commitment,
          sp.estimated_duration,
          sp.created_at,
          sp.updated_at,
          COUNT(DISTINCT st.id) as subtopic_count,
          COUNT(DISTINCT r.id) as total_resources,
          COUNT(DISTINCT CASE WHEN r.completed = true THEN r.id END) as completed_resources
        FROM study_plans sp
        LEFT JOIN subtopics st ON sp.id = st.study_plan_id
        LEFT JOIN resources r ON st.id = r.subtopic_id
        WHERE sp.user_id IS NULL
        GROUP BY sp.id, sp.title, sp.description, sp.topic, sp.difficulty, sp.time_commitment, sp.estimated_duration, sp.created_at, sp.updated_at
        ORDER BY sp.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    return Response.json(studyPlans);
  } catch (error) {
    console.error("Error fetching study plans:", error);
    return Response.json(
      { error: "Failed to fetch study plans" },
      { status: 500 },
    );
  }
}

// POST - Create a new study plan
export async function POST(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const studyPlanData = await request.json();

    const {
      title,
      description,
      topic,
      difficulty,
      timeCommitment,
      estimatedDuration,
      subtopics,
    } = studyPlanData;

    if (!title || !topic || !difficulty || !timeCommitment || !subtopics) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Use transaction to ensure data consistency
    const result = await sql.transaction(async (txn) => {
      // Insert study plan with user ID if authenticated
      const [studyPlan] = await txn`
        INSERT INTO study_plans (title, description, topic, difficulty, time_commitment, estimated_duration, user_id)
        VALUES (${title}, ${description}, ${topic}, ${difficulty}, ${timeCommitment}, ${estimatedDuration}, ${userId || null})
        RETURNING *
      `;

      // Insert subtopics and resources
      for (let i = 0; i < subtopics.length; i++) {
        const subtopic = subtopics[i];

        const [insertedSubtopic] = await txn`
          INSERT INTO subtopics (study_plan_id, title, description, estimated_time, order_index)
          VALUES (${studyPlan.id}, ${subtopic.title}, ${subtopic.description}, ${subtopic.estimatedTime}, ${i + 1})
          RETURNING *
        `;

        // Insert resources for this subtopic
        for (let j = 0; j < subtopic.resources.length; j++) {
          const resource = subtopic.resources[j];

          await txn`
            INSERT INTO resources (subtopic_id, title, description, resource_type, url, completed, order_index)
            VALUES (${insertedSubtopic.id}, ${resource.title}, ${resource.description}, ${resource.type}, ${resource.url}, ${resource.completed || false}, ${j + 1})
          `;
        }
      }

      return studyPlan;
    });

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating study plan:", error);
    return Response.json(
      { error: "Failed to create study plan" },
      { status: 500 },
    );
  }
}
