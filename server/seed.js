const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskDB')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error(err));

// Schemas
const UserSchema = new mongoose.Schema({
    name: String,
  username: String,
  password: String,
  isAdmin: Boolean
});

const TaskSchema = new mongoose.Schema({
  title: String,
  userId: String
});

// Models
const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data (optional but recommended)
    await User.deleteMany({});
    await Task.deleteMany({});

    // ---- USERS ----
    const users = await User.insertMany([
      {
        name: 'Neon',
        username: 'neonFox27',
        password: 'F!9xQ2@Lr8',
        isAdmin: true
      },
      {
        name: 'Byte',
        username: 'byteRider_84',
        password: 'Z7$kP@1mWc',
        isAdmin: false
      },
      {
        name: 'Nova',
        username: 'silentNova',
        password: 'N#4eT9!qS2',
        isAdmin: false
      }
    ]);

    console.log('Users seeded');

    const adminUser = users.find(u => u.isAdmin);
    const normalUsers = users.filter(u => !u.isAdmin);

    // ---- TASKS ----
    const tasks = [];

    // 10 admin tasks
    for (let i = 1; i <= 10; i++) {
      tasks.push({
        title: `Admin Task ${i}`,
        userId: adminUser._id.toString()
      });
    }

    // 5 tasks per normal user (total 10)
    normalUsers.forEach((user, index) => {
      for (let i = 1; i <= 5; i++) {
        tasks.push({
          title: `User ${index + 1} Task ${i}`,
          userId: user._id.toString()
        });
      }
    });

    await Task.insertMany(tasks);
    console.log('Tasks seeded (20 total)');

    mongoose.connection.close();
    console.log('Seeding complete 🌱');
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
}

seedDatabase();