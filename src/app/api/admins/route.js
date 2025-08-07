import mongoose from 'mongoose';
import Admin from '@/models/admin';
import Institution from '@/models/institutes';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs';

// Mock email sending function (replace with actual email service like Nodemailer)
const sendCredentialsEmail = async (email, name, password) => {
  try {
    // Simulate sending email with credentials
    console.log(`Sending credentials to ${email}: Name: ${name}, Password: ${password}`);
    return true;
  } catch (error) {
    throw new Error('Failed to send credentials email');
  }
};

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (status !== 'all') query.status = status;

    const admins = await Admin.find(query)
      .populate('institutionId', 'name type location students status')
      .sort({ name: 1 })
      .lean();

    // Transform the data to include institution details in the response
    const transformedAdmins = admins.map(admin => ({
      ...admin,
      institution: admin.institutionId?.name || 'Unknown',
      institutionType: admin.institutionId?.type || 'Unknown',
      institutionDetails: admin.institutionId || null
    }));

    return Response.json({ success: true, data: transformedAdmins });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'institutionId', 'role', 'password', 'permissions'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return Response.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate institutionId
    const institution = await Institution.findById(body.institutionId);
    if (!institution) {
      return Response.json(
        { success: false, error: 'Invalid institution ID' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingAdmin = await Admin.findOne({ email: body.email });
    if (existingAdmin) {
      return Response.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const admin = new Admin({
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      institutionId: body.institutionId,
      role: body.role,
      department: body.department || null,
      notes: body.notes || null,
      permissions: body.permissions,
      password: hashedPassword,
      status: 'Pending',
      loginActivity: body.loginActivity || [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await admin.save();

    // Send credentials if requested
    if (body.sendCredentials) {
      await sendCredentialsEmail(body.email, admin.name, body.password);
    }

    // Include institution details in the response
    const populatedAdmin = await Admin.findById(admin._id)
      .populate('institutionId', 'name type location students status')
      .lean();

    const responseAdmin = {
      ...populatedAdmin,
      institution: populatedAdmin.institutionId?.name || 'Unknown',
      institutionType: populatedAdmin.institutionId?.type || 'Unknown',
      institutionDetails: populatedAdmin.institutionId || null
    };

    return Response.json({ success: true, data: responseAdmin }, { status: 201 });
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
      return Response.json({ success: false, error: 'Admin ID is required' }, { status: 400 });
    }

    // Validate institutionId if provided
    if (updateData.institutionId) {
      const institution = await Institution.findById(updateData.institutionId);
      if (!institution) {
        return Response.json(
          { success: false, error: 'Invalid institution ID' },
          { status: 400 }
        );
      }
    }

    // Hash password if provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const admin = await Admin.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('institutionId', 'name type location students status');

    if (!admin) {
      return Response.json({ success: false, error: 'Admin not found' }, { status: 404 });
    }

    // Send credentials if requested
    if (updateData.sendCredentials && updateData.password) {
      await sendCredentialsEmail(admin.email, admin.name, body.password);
    }

    const responseAdmin = {
      ...admin.toObject(),
      institution: admin.institutionId?.name || 'Unknown',
      institutionType: admin.institutionId?.type || 'Unknown',
      institutionDetails: admin.institutionId || null
    };

    return Response.json({ success: true, data: responseAdmin });
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
      return Response.json({ success: false, error: 'Admin ID is required' }, { status: 400 });
    }

    const admin = await Admin.findByIdAndUpdate(
      id,
      { status: 'Inactive', updatedAt: new Date() },
      { new: true }
    ).populate('institutionId', 'name type location students status');

    if (!admin) {
      return Response.json({ success: false, error: 'Admin not found' }, { status: 404 });
    }

    const responseAdmin = {
      ...admin.toObject(),
      institution: admin.institutionId?.name || 'Unknown',
      institutionType: admin.institutionId?.type || 'Unknown',
      institutionDetails: admin.institutionId || null
    };

    return Response.json({ success: true, data: responseAdmin });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}