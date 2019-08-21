
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();

      tbl
        .string('username', 24)
        .notNullable()
        .unique();
      tbl
        .string('password', 244)
        .notNullable();
      tbl
        .string('department', 32)
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
