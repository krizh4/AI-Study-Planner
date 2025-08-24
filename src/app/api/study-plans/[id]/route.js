import sql from "@/app/api/utils/sql";

// GET - Get a specific study plan with all subtopics and resources
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json({ error: 'Study plan ID is required' }, { status: 400 });
    }

    // Get the study plan
    const [studyPlan] = await sql`
      SELECT * FROM study_plans WHERE id = ${id}
    `;

    if (!studyPlan) {
      return Response.json({ error: 'Study plan not found' }, { status: 404 });
    }

    // Get subtopics with their resources
    const subtopics = await sql`
      SELECT 
        st.id,
        st.title,
        st.description,
        st.estimated_time,
        st.order_index,
        json_agg(
          json_build_object(
            'id', r.id,
            'title', r.title,
            'description', r.description,
            'type', r.resource_type,
            'url', r.url,
            'completed', r.completed,
            'order_index', r.order_index
          ) ORDER BY r.order_index
        ) as resources
      FROM subtopics st
      LEFT JOIN resources r ON st.id = r.subtopic_id
      WHERE st.study_plan_id = ${id}
      GROUP BY st.id, st.title, st.description, st.estimated_time, st.order_index
      ORDER BY st.order_index
    `;

    // Combine the data
    const fullStudyPlan = {
      ...studyPlan,
      subtopics: subtopics.map(subtopic => ({
        ...subtopic,
        estimatedTime: subtopic.estimated_time,
        resources: subtopic.resources.filter(r => r.id !== null) // Remove null resources
      }))
    };

    return Response.json(fullStudyPlan);
  } catch (error) {
    console.error('Error fetching study plan:', error);
    return Response.json({ error: 'Failed to fetch study plan' }, { status: 500 });
  }
}

// PUT - Update a study plan
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updateData = await request.json();

    if (!id) {
      return Response.json({ error: 'Study plan ID is required' }, { status: 400 });
    }

    const { title, description, topic, difficulty, timeCommitment, estimatedDuration } = updateData;

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = $' + (updateValues.length + 1));
      updateValues.push(title);
    }
    if (description !== undefined) {
      updateFields.push('description = $' + (updateValues.length + 1));
      updateValues.push(description);
    }
    if (topic !== undefined) {
      updateFields.push('topic = $' + (updateValues.length + 1));
      updateValues.push(topic);
    }
    if (difficulty !== undefined) {
      updateFields.push('difficulty = $' + (updateValues.length + 1));
      updateValues.push(difficulty);
    }
    if (timeCommitment !== undefined) {
      updateFields.push('time_commitment = $' + (updateValues.length + 1));
      updateValues.push(timeCommitment);
    }
    if (estimatedDuration !== undefined) {
      updateFields.push('estimated_duration = $' + (updateValues.length + 1));
      updateValues.push(estimatedDuration);
    }

    if (updateFields.length === 0) {
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    const query = `
      UPDATE study_plans 
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `;

    const [updatedStudyPlan] = await sql(query, updateValues);

    if (!updatedStudyPlan) {
      return Response.json({ error: 'Study plan not found' }, { status: 404 });
    }

    return Response.json(updatedStudyPlan);
  } catch (error) {
    console.error('Error updating study plan:', error);
    return Response.json({ error: 'Failed to update study plan' }, { status: 500 });
  }
}

// DELETE - Delete a study plan
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json({ error: 'Study plan ID is required' }, { status: 400 });
    }

    const [deletedStudyPlan] = await sql`
      DELETE FROM study_plans WHERE id = ${id} RETURNING *
    `;

    if (!deletedStudyPlan) {
      return Response.json({ error: 'Study plan not found' }, { status: 404 });
    }

    return Response.json({ message: 'Study plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting study plan:', error);
    return Response.json({ error: 'Failed to delete study plan' }, { status: 500 });
  }
}