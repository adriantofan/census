const knex = require('./connection');

function getByField(fieldName) {
  return knex('census as C')
    .column({ value: fieldName })
    .whereNotNull(fieldName)
    .as('value')
    .count()
    .as('count')
    .avg('age')
    .groupBy(fieldName)
    .orderBy('count', 'desc')
    .limit(100);
}

module.exports = {
  getByField,
};
