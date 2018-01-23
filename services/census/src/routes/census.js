const express = require('express');

const queries = require('../db/queries.js');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/by/:fieldId(([0-9]|[1-3][0-9]|40))', (req, res, next) => {
  const fields = ['class of worker', 'industry code', 'occupation code', 'education', 'wage per hour', 'last education', 'marital status', 'major industry code', 'major occupation code', 'mace', 'hispanice', 'sex', 'member of labor', 'reason for unemployment', 'fulltime', 'capital gain', 'capital loss', 'dividends', 'income tax liability', 'previous residence region', 'previous residence state', 'household-with-family', 'household-simple', 'weight', 'msa-change', 'reg-change', 'within-reg-change', 'lived-here', 'migration prev res in sunbelt', 'num persons worked for employer', 'family members under 118', 'father birth country', 'mother birth country', 'birth country', 'citizenship', 'own business or self employed', 'fill questionnaire for veteran\'s admin', 'veterans benefits', 'weeks worked in year', 'year', 'salary range'];
  const fieldId = req.params.fieldId;
  const fieldName = fields[fieldId];
  return queries.getByField(fieldName)
  .then((items) => {
    res.json({
      status: 'success',
      data: {
        name: fieldName,
        items,
      },
    });
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
