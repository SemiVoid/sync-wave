const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;

let videoQueue = [];

// Get Current Video Queue
router.get('/', (req, res) => {
  res.send(videoQueue);
});

// Add a Video to Queue
router.post('/', async (req, res) => {
  let linkRegex = new RegExp(
    '(?:https?://)?(?:www.)?youtu(?:.be/|be.com/S*(?:watch|embed)(?:(?:(?=/[^&s?]+(?!S))/)|(?:S*v=|v/)))([^&s?]+)'
  );
  let videoLink = req.body.videoLink;
  if (linkRegex.test(videoLink)) {
    let cutLink = linkRegex.exec(videoLink)[1];

    const resp = await axios.get(
      `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${cutLink}&format=json`
    );

    console.log(resp.data.title);

    res.status(201).send(`${cutLink} Video was added`);
  } else {
    res.status(500).send('Error: Video was not added');
  }
  // Socket IO emit videoQueueUpdate
});

// Remove a video from Queue
router.delete('/:id', (req, res) => {
  videoQueue = videoQueue.filter((item) => item.id !== req.params.id);
  res.send('Video was removed');
  // Socket IO emit videoQueueUpdate
});

module.exports = router;
