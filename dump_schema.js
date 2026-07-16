const fs = require('fs');

try {
  const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));
  const summary = {};

  // Initialize collections
  if (schema.collections) {
    schema.collections.forEach(c => {
      summary[c.collection] = {
        note: c.meta ? c.meta.note : '',
        fields: {}
      };
    });
  }

  // Populate fields
  if (schema.fields) {
    schema.fields.forEach(f => {
      if (!summary[f.collection]) {
        summary[f.collection] = { note: '', fields: {} };
      }
      summary[f.collection].fields[f.field] = {
        type: f.type,
        nullable: f.schema ? f.schema.is_nullable : true,
        is_primary_key: f.schema ? f.schema.is_primary_key : false,
        note: f.meta ? f.meta.note : ''
      };
    });
  }

  fs.writeFileSync('schema_summary.json', JSON.stringify(summary, null, 2), 'utf8');
  console.log('Schema summary written to schema_summary.json successfully!');
} catch (err) {
  console.error('Error parsing schema:', err);
}
