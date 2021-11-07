require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true } ,
  age: Number,
  favoriteFoods : [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let personObj = {name:"Mohamed",age:37,favoriteFoods:["Meat","Falafel"]};
  let person = new Person(personObj);
  person.save((err, data)=>{
      err?done(err):done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err, data)=>{
      err?done(err):done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, data)=>{
      err?done(err):done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err, data)=>{
      err?done(err):done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err, data)=>{
      err?done(err):done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId,(err,data)=>{
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data)=>{
      err?done(err):done(null, data);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({name:personName},(err,data)=>{
    data.age=ageToSet;
    data.save((err,data)=>{
      err?done(err):done(null, data);
    });
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err, data)=>{
      err?done(err):done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    err?done(err):done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select('name').exec((err,data)=>{
    err?done(err):done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
