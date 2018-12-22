const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground').then(
    () => console.log('Connected to MongoDB....')
).catch((error) => console.log('Error to connect to mongoDB....' + error))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // lowercase:true,
        // trim:true
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
    
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const r = v && v.length > 0
                    callback(r)
                }, 1000);
            },
            message: 'the course should be greater 0'
        }
    },
    data: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 20,
        required: function () {
            return this.isPublished;
        },
        get:v=> Math.round(v),
        set:v=> Math.round(v)
    }
})

const Course = mongoose.model('Course', courseSchema)
createCourse = async () => {
    const course = new Course({
        name: 'Angular',
        author: 'ahmed',
        category: 'web',
        tags: ["angular"],
        isPublished: true,
        price: 10.5
    })
    try {
        const isValid = await course.validate();
        const result = await course.save();
        console.log(result)

    } catch (ex) {
        for(field in ex.errors){
            console.log("ex ", ex.errors[field]);
        }

    }

}

getCourse = async () => {

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        // .find({author:'ahmed', isPublished: true})
        // .find().or([{author:'ahmed'},{isPublished: true}])
        // .find({ price: { $gt: 10, $lte: 20 } })
        // .find({ price: {$in:[10, 15, 20] } })
        //start with
        .find({ author: /^ahm/ })
        //end with
        .find({ author: /ed$/i })
        //contains with
        .find({ author: /.*ed.*/i })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: -1 })
        .select({ name: 1, author: 1 });
    // .select("name author");
    console.log("courses ", courses);
}

updateCourse = async (id) => {
    const course = await Course.findById(id)
    if (!course) return;
    course.isPublished = true;
    course.author = "ghoul";
    // course.set({
    //     isPublished : true,
    //     author : "ghoul"
    // })
    const result = await course.save();
    console.log("result ", result);

}

updateCourse2 = async (id) => {
    const course = await Course.findByIdAndUpdate(id, {
        $set: { isPublished: false }
    }, { new: true })
    console.log("result ", course);
}

removeCourse = async (id) => {
    // const result = await Course.deleteOne({_id: id})
    const course = await Course.findByIdAndDelete(id)

    console.log("result ", course);

}

// removeCourse('5c1d59c32588223989e48909')
// updateCourse2('5c1d59c32588223989e48909')
// getCourse();
createCourse();