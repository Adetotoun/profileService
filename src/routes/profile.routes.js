const express = require('express');
const { createProfile, singleProfile, allProfiles, deleteProfile } = require('../controller/profile.controller');
const router = express.Router();

router.post('/profiles', createProfile);
router.get('/profileById/:id', singleProfile);
router.get('/allProfiles',allProfiles);
router.delete('/deleteProfiles/:id', deleteProfile);





module.exports = router;