const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const authSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
})
const Author = mongoose.model('Author', authSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: { type: authSchema, required: true }
  author: [authSchema]
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

async function updateAuthor(courseId) {
  //  const course = await Course.findById(courseId);
  const course = await Course.update({ _id: courseId }, {
    $set: {
      "author.name": "ghoul"
    }
  });
  // const course = await Course.update({ _id: courseId }, {
  //   $unset: {
  //     "author.name": ""
  //   }
  // });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}


async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.author.id(authorId);
  author.remove();
  course.save();
}



// addAuthor('5c1eccf7b37f120b15895dea',new Author({ name: "khaled" }))
removeAuthor('5c1eccf7b37f120b15895dea','5c1f611b4c3e9a140850e727')
// createCourse('Angular',
//   [new Author({ name: "ahmed2" }), new Author({ name: "ahmed" })])
// updateAuthor("5c1ecac44f126c09e6e4fb27")
// listCourses();