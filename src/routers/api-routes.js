'use strict';

const express = require('express');

// import Interface to contact with DB
const Interface = require('../models/Interface');

// import user model
const meetingModel = require('../models/meetingSchema');

// create new instance of Interface class
const interfaceDB = new Interface(meetingModel);

// access control list middleware
const permissions = require('../middlewares/acl');

// bearer auth middleware
const bearerAuth = require('../middlewares/bearerAuth');

// use express Router
const router = express.Router();

// admin routes
router.get('/allMeeting', bearerAuth, permissions('read-all'), getAllMeetingHandler);
router.put('/meeting/:id', bearerAuth, permissions('update'), updateMeetingHandler);

// customer routes
router.get('/myMeeting', bearerAuth, permissions('read-limitted'), getMyMeetingHandler);
router.post('/meeting', bearerAuth, permissions('create'), createMeetingHandler);
router.delete('/meeting/:id', bearerAuth, permissions('delete-limitted'), deleteMeetingHandler);

// get all meeting handler
async function getAllMeetingHandler(req, res, next) {
  try {
    let allRecords = await interfaceDB.get();
    res.status(200).send(allRecords);
  } catch (error) {
    next(error.message, 'get all Meeting error');
  }
}

// update meeting handler
async function updateMeetingHandler(req, res, next) {
  let { id } = req.params;
  let { status } = req.body;

  try {
    let MeetingData = await interfaceDB.get(id);
    MeetingData.Meeting_status = status;
    await MeetingData.save();
    res.status(201).send(MeetingData);
  } catch (error) {
    next(error.message, 'update Meeting error');
  }
}

// get customer meeting handler
async function getMyMeetingHandler(req, res, next) {
  const { email } = req.user;

  try {
    let allRecords = await interfaceDB.getByMail(email);
    res.status(200).send(allRecords);
  } catch (error) {
    next(error.message, 'get customer Meeting error');
  }
}

// create meeting handler
async function createMeetingHandler(req, res, next) {
  const { username, email, city } = req.user;
  const { meetingType, meetingContent, meetingDate, meetingNumber } = req.body;

  // generate unique id for the meeting
  const meetingID = `${username.slice(0, 3)}-${Math.floor(Math.random() * (100000 - 10000)) + 10000}`;

  const obj = {
    meeting_id: meetingID,
    meeting_type: meetingType,
    meeting_content: meetingContent,
    meeting_date: meetingDate,
    meeting_number: meetingNumber,
    customer_username: username,
    customer_email: email,
    customer_position: city,
  };
  try {
    const addedMeeting = await interfaceDB.create(obj);
    res.status(200).send(addedMeeting);
  } catch (error) {
    next(error.message, ' add meeting error');
  }
}

// delete meeting handler
async function deleteMeetingHandler(req, res, next) {
  const { id } = req.params;
  try {
    const deletedMeeting = await interfaceDB.delete(id);
    res.status(200).send(deletedMeeting);
  } catch (error) {
    next(error.message, 'delete meeting error');
  }
}

module.exports = router;