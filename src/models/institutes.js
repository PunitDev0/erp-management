import mongoose from 'mongoose';

const InstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true,
    maxlength: [100, 'Institution name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Institution type is required'],
    enum: {
      values: ['School', 'College', 'University'],
      message: '{VALUE} is not a valid institution type'
    },
    trim: true
  },
  category: {
    type: String,
    trim: true,
    maxlength: [100, 'Category cannot exceed 100 characters']
  },
  established: {
    type: Number,
    min: [1800, 'Established year must be after 1800'],
    max: [new Date().getFullYear(), 'Established year cannot be in the future']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s-]{10,20}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/\S+$/, 'Please enter a valid URL'],
    default: null
  },
  timezone: {
    type: String,
    trim: true,
    enum: {
      values: ['est', 'cst', 'mst', 'pst'],
      message: '{VALUE} is not a valid timezone'
    },
    default: null
  },
  admin: {
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
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid admin email address']
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-]{10,20}$/, 'Please enter a valid admin phone number'],
      default: null
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'principal', 'director'],
        message: '{VALUE} is not a valid admin role'
      },
      default: 'admin'
    }
  },
  students: {
    type: Number,
    default: 0,
    min: [0, 'Number of students cannot be negative']
  },
  teachers: {
    type: Number,
    default: 0,
    min: [0, 'Number of teachers cannot be negative']
  },
  status: {
    type: String,
    enum: {
      values: ['Active', 'Pending', 'Inactive'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Pending'
  },
  revenue: {
    type: Number,
    default: 0,
    min: [0, 'Revenue cannot be negative']
  },
  growth: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
InstitutionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Add index for common search fields
InstitutionSchema.index({ name: 'text', type: 'text', location: 'text', 'admin.name': 'text' });

const Institution = mongoose.models.Institution || mongoose.model('Institution', InstitutionSchema);

export default Institution;