exports.getHome = (req, res) => res.status(200).send({
  success: true,
  message: 'OK',
});

exports.getPublic = (req, res) => res.status(200).send(
  'OK',
);