import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true,
    maxlength: [100, 'Admin name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Admin email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-]{10,20}$/, 'Please enter a valid phone number'],
    default: null
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: [true, 'Institution ID is required']
  },
  role: {
    type: String,
    required: [true, 'Admin role is required'],
    enum: {
      values: ['admin', 'sub-admin', 'manager', 'coordinator'],
      message: '{VALUE} is not a valid admin role'
    },
    default: 'admin'
  },
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters'],
    default: null
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    default: null
  },
  permissions: [{
    type: String,
    enum: {
      values: [
        'students',
        'teachers',
        'attendance',
        'grades',
        'fees',
        'library',
        'notices',
        'reports',
        'settings'
      ],
      message: '{VALUE} is not a valid permission'
    }
  }],
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  status: {
    type: String,
    enum: {
      values: ['Active', 'Pending', 'Inactive'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Pending'
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginCount: {
    type: Number,
    default: 0,
    min: [0, 'Login count cannot be negative']
  },
  loginActivity: [{
    month: {
      type: String,
      required: true,
      trim: true
    },
    logins: {
      type: Number,
      required: true,
      min: [0, 'Logins cannot be negative']
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

AdminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

AdminSchema.index({ name: 'text', email: 'text' });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;