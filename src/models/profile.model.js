const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    id: String,
    name: String,
    gender: String,
    gender_probability: Number,
    sample_size: Number,
    age: Number,
    age_group: String,
    country_id: String,
    country_probability: Number,
    Created_at: String
})

const Profile = mongoose.model('Profile',ProfileSchema);

module.exports = Profile;