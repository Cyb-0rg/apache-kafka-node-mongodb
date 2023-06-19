import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'age',
      type: 'string',
    },
    {
      name: 'gender',
      type: 'string',
    },
  ]
});