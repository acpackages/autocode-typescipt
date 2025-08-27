/**
 * AcDoc({
 * "description": "Enumeration of different SQL-related entities such as tables, views, triggers, and more.",
 * "author": "Sanket Patel",
 * "type": "development"
 * })
 */
export enum AcEnumSqlEntity {
  /** AcDoc({ "description": "Represents a SQL function entity." }) */
  Function = 'FUNCTION',

  /** AcDoc({ "description": "Represents a relationship entity in SQL such as foreign keys." }) */
  Relationship = 'RELATIONSHIP',

  /** AcDoc({ "description": "Represents a stored procedure in SQL." }) */
  StoredProcedure = 'STORED_PROCEDURE', // Converted 'stored_procedure' to 'STORED_PROCEDURE'

  /** AcDoc({ "description": "Represents a table entity in SQL." }) */
  Table = 'TABLE',

  /** AcDoc({ "description": "Represents a SQL trigger." }) */
  Trigger = 'TRIGGER',

  /** AcDoc({ "description": "Represents a view entity in SQL." }) */
  View = 'VIEW',

  /** AcDoc({ "description": "Represents an index used to speed up queries." }) */
  Index = 'INDEX',

  /** AcDoc({ "description": "Represents a schema in a SQL database." }) */
  Schema = 'SCHEMA',

  /** AcDoc({ "description": "Represents a sequence object for generating numeric values." }) */
  Sequence = 'SEQUENCE',

  /** AcDoc({ "description": "Represents a constraint entity like primary key or check constraint." }) */
  Constraint = 'CONSTRAINT',

  /** AcDoc({ "description": "Represents a column in a SQL table." }) */
  Column = 'COLUMN',

  /** AcDoc({ "description": "Represents an entire SQL database." }) */
  Database = 'DATABASE',

  /** AcDoc({ "description": "Represents a user-defined type (UDT)." }) */
  UserDefinedType = 'USER_DEFINED_TYPE', // Converted 'user_defined_type' to 'USER_DEFINED_TYPE'

  /** AcDoc({ "description": "Represents a synonym, which is an alias for another object." }) */
  Synonym = 'SYNONYM',

  /** AcDoc({ "description": "Represents a SQL role." }) */
  Role = 'ROLE',

  /** AcDoc({ "description": "Represents a SQL rule object." }) */
  Rule = 'RULE',

  /** AcDoc({ "description": "Represents a default value object in SQL." }) */
  DefaultValue = 'DEFAULT', // Note: 'default' becomes 'DEFAULT'

  /** AcDoc({ "description": "Represents a partition function used in table partitioning." }) */
  PartitionFunction = 'PARTITION_FUNCTION', // Converted 'partition_function' to 'PARTITION_FUNCTION'

  /** AcDoc({ "description": "Represents a partition scheme for mapping partitions to filegroups." }) */
  PartitionScheme = 'PARTITION_SCHEME', // Converted 'partition_scheme' to 'PARTITION_SCHEME'
}
