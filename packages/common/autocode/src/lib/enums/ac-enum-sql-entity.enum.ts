/**
 * AcDoc({
 *   "description": "Enumeration of different SQL-related entities such as tables, views, triggers, and more.",
 *   "author": "Sanket Patel",
 *   "type": "development"
 * })
 */
export enum AcEnumSqlEntity {
  /** AcDoc({ "description": "Represents a SQL function entity." }) */
  Function = 'function',

  /** AcDoc({ "description": "Represents a relationship entity in SQL such as foreign keys." }) */
  Relationship = 'relationship',

  /** AcDoc({ "description": "Represents a stored procedure in SQL." }) */
  StoredProcedure = 'stored_procedure',

  /** AcDoc({ "description": "Represents a table entity in SQL." }) */
  Table = 'table',

  /** AcDoc({ "description": "Represents a SQL trigger." }) */
  Trigger = 'trigger',

  /** AcDoc({ "description": "Represents a view entity in SQL." }) */
  View = 'view',

  /** AcDoc({ "description": "Represents an index used to speed up queries." }) */
  Index = 'index',

  /** AcDoc({ "description": "Represents a schema in a SQL database." }) */
  Schema = 'schema',

  /** AcDoc({ "description": "Represents a sequence object for generating numeric values." }) */
  Sequence = 'sequence',

  /** AcDoc({ "description": "Represents a constraint entity like primary key or check constraint." }) */
  Constraint = 'constraint',

  /** AcDoc({ "description": "Represents a column in a SQL table." }) */
  Column = 'column',

  /** AcDoc({ "description": "Represents an entire SQL database." }) */
  Database = 'database',

  /** AcDoc({ "description": "Represents a user-defined type (UDT)." }) */
  UserDefinedType = 'user_defined_type',

  /** AcDoc({ "description": "Represents a synonym, which is an alias for another object." }) */
  Synonym = 'synonym',

  /** AcDoc({ "description": "Represents a SQL role." }) */
  Role = 'role',

  /** AcDoc({ "description": "Represents a SQL rule object." }) */
  Rule = 'rule',

  /** AcDoc({ "description": "Represents a default value object in SQL." }) */
  DefaultValue = 'default',

  /** AcDoc({ "description": "Represents a partition function used in table partitioning." }) */
  PartitionFunction = 'partition_function',

  /** AcDoc({ "description": "Represents a partition scheme for mapping partitions to filegroups." }) */
  PartitionScheme = 'partition_scheme',
}
