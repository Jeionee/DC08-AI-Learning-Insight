/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
	pgm.createTable("students", {
		id: {
			type: "VARCHAR(50)",
			primaryKey: true,
		},
		name: {
			type: "TEXT",
			notNull: true,
		},
		learning_style: {
			type: "TEXT",
			notNull: true,
		},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.deleteTable("students");
};
