const Profile = require('../models/profile.model');
const axios = require('axios');
const {getAgeGroup, getTopCountry} = require('../utility/classify');
const {v7: uuidv7} = require('uuid'); //destructuring with renaming

const createProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Name is required"
      });
    }

    if (typeof name !== "string") {
      return res.status(422).json({
        status: "error",
        message: "Invalid type"
      });
    }

    const existing = await Profile.findOne({ name: name.toLowerCase() });

    if (existing) {
      return res.status(200).json({
        status: "success",
        message: "Profile already exists",
        data: existing
      });
    }

    const [genderResponse, ageResponse, nationResponse] = await Promise.all([
      axios.get("https://api.genderize.io", { params: { name } }),
      axios.get("https://api.agify.io", { params: { name } }),
      axios.get("https://api.nationalize.io", { params: { name } })
    ]);

    const { gender, probability, count } = genderResponse.data;
    const { age } = ageResponse.data;
    const countries = nationResponse.data.country;

    if (!gender || count === 0) {
      return res.status(502).json({
        status: "error",
        message: "Genderize returned an invalid response"
      });
    }

    if (age === null) {
      return res.status(502).json({
        status: "error",
        message: "Agify returned an invalid response"
      });
    }

    if (!countries || countries.length === 0) {
      return res.status(502).json({
        status: "error",
        message: "Nationalize returned an invalid response"
      });
    }

    const age_group = getAgeGroup(age);
    const topCountry = getTopCountry(countries);

    const profile = new Profile({
      id: uuidv7(),
      name: name.toLowerCase(),
      gender,
      gender_probability: probability,
      sample_size: count,
      age,
      age_group,
      country_id: topCountry.country_id,
      country_probability: topCountry.probability,
      created_at: new Date().toISOString()
    });

    await profile.save();

    return res.status(201).json({
      status: "success",
      data: profile
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const singleProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const profile = await Profile.findOne({id});
        if (!profile) {
            return res.status(404).json({
            status: "error",
            message: "Profile not found"
    });
    }
    return res.json({
    status: "success",
    data: profile
    }) 
    }catch (error) {
        return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
    }
}

const allProfiles = async (req, res) => {
  const { gender, country_id, age_group } = req.query;
    try{
        const search = {};

        if (gender) search.gender = gender.toLowerCase();
        if (country_id) search.country_id = country_id.toUpperCase();
        if (age_group) search.age_group = age_group.toLowerCase();

        const profiles = await Profile.find(search);

        return res.json({
            status: "success",
            count: profiles.length,
            data: profiles.map(p => ({
            id: p.id,
            name: p.name,
            gender: p.gender,
            age: p.age,
            age_group: p.age_group,
            country_id: p.country_id
            }))
        })
    }catch(error){
        return res.status(500).json({
      status: "error",
      message: "Internal server error"
    })  
}
}

const deleteProfile = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await Profile.findOneAndDelete({id});
    if (!result) {
    return res.status(404).json({
      status: "error",
      message: "Profile not found"
    });
   }
   return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }  
};

module.exports = {
    createProfile,
    singleProfile,
    allProfiles,
    deleteProfile
}