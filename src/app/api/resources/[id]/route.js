import sql from "@/app/api/utils/sql";

// PUT - Update resource completion status
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { completed } = await request.json();

    if (!id) {
      return Response.json({ error: 'Resource ID is required' }, { status: 400 });
    }

    if (typeof completed !== 'boolean') {
      return Response.json({ error: 'Completed status must be a boolean' }, { status: 400 });
    }

    const [updatedResource] = await sql`
      UPDATE resources 
      SET completed = ${completed}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedResource) {
      return Response.json({ error: 'Resource not found' }, { status: 404 });
    }

    return Response.json(updatedResource);
  } catch (error) {
    console.error('Error updating resource:', error);
    return Response.json({ error: 'Failed to update resource' }, { status: 500 });
  }
}

// GET - Get a specific resource
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json({ error: 'Resource ID is required' }, { status: 400 });
    }

    const [resource] = await sql`
      SELECT * FROM resources WHERE id = ${id}
    `;

    if (!resource) {
      return Response.json({ error: 'Resource not found' }, { status: 404 });
    }

    return Response.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return Response.json({ error: 'Failed to fetch resource' }, { status: 500 });
  }
}