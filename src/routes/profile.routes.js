const express = require('express');
const { createProfile, singleProfile, allProfiles, deleteProfile } = require('../controller/profile.controller');
const router = express.Router();

router.post('/profiles', createProfile);
router.get('/profiles/:id', singleProfile);
router.get('/profiles',allProfiles);
router.delete('/profiles/:id', deleteProfile);





module.exports = router;