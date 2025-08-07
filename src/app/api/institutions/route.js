import mongoose from 'mongoose';
import Institution from '@/models/institutes';
import connectToDatabase from '@/lib/db';

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'all';
    const status = searchParams.get('status') || 'all';

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { 'admin.name': { $regex: search, $options: 'i' } },
        { 'admin.email': { $regex: search, $options: 'i' } }
      ];
    }
    if (type !== 'all') query.type = type;
    if (status !== 'all') query.status = status;

    const institutions = await Institution.find(query)
      .sort({ name: 1 })
      .lean();

    return Response.json({ success: true, data: institutions });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
console.log(body);

    // Validate required fields
    const requiredFields = ['name', 'type', 'address', 'phone', 'email', 'admin'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return Response.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate nested admin fields
    const requiredAdminFields = ['name', 'email'];
    const missingAdminFields = requiredAdminFields.filter(field => !body.admin[field]);
    if (missingAdminFields.length > 0) {
      return Response.json(
        { success: false, error: `Missing required admin fields: ${missingAdminFields.join(', ')}` },
        { status: 400 }
      );
    }

    const institution = new Institution({
      ...body,
      lastActivity: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      // Set default values for optional fields if not provided
      students: body.students || 0,
      teachers: body.teachers || 0,
      revenue: body.revenue || 0,
      growth: body.growth || 0,
      rating: body.rating || 0,
      status: body.status || 'Pending'
    });

    await institution.save();

    return Response.json({ success: true, data: institution }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json({ success: false, error: 'Institution ID is required' }, { status: 400 });
    }

    const institution = await Institution.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!institution) {
      return Response.json({ success: false, error: 'Institution not found' }, { status: 404 });
    }

    return Response.json({ success: true, data: institution });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ success: false, error: 'Institution ID is required' }, { status: 400 });
    }

    const institution = await Institution.findByIdAndUpdate(
      id,
      { status: 'Inactive', updatedAt: new Date() },
      { new: true }
    );

    if (!institution) {
      return Response.json({ success: false, error: 'Institution not found' }, { status: 404 });
    }

    return Response.json({ success: true, data: institution });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}