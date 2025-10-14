/**
 * SQL helper utilities
 */

export interface QueryBuilder {
  select: string[];
  from: string;
  joins: string[];
  where: string[];
  orderBy: string[];
  limit?: number;
  offset?: number;
}

/**
 * Simple query builder for SELECT statements
 */
export class SelectQueryBuilder {
  private query: QueryBuilder;

  constructor(table: string) {
    this.query = {
      select: ['*'],
      from: table,
      joins: [],
      where: [],
      orderBy: [],
    };
  }

  /**
   * Specify columns to select
   */
  public select(columns: string[]): this {
    this.query.select = columns;
    return this;
  }

  /**
   * Add JOIN clause
   */
  public join(table: string, condition: string, type: 'INNER' | 'LEFT' | 'RIGHT' = 'INNER'): this {
    this.query.joins.push(`${type} JOIN ${table} ON ${condition}`);
    return this;
  }

  /**
   * Add WHERE condition
   */
  public where(condition: string): this {
    this.query.where.push(condition);
    return this;
  }

  /**
   * Add ORDER BY clause
   */
  public orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.query.orderBy.push(`${column} ${direction}`);
    return this;
  }

  /**
   * Set LIMIT
   */
  public limit(count: number): this {
    this.query.limit = count;
    return this;
  }

  /**
   * Set OFFSET
   */
  public offset(count: number): this {
    this.query.offset = count;
    return this;
  }

  /**
   * Build the final SQL query
   */
  public build(): string {
    let sql = `SELECT ${this.query.select.join(', ')} FROM ${this.query.from}`;

    if (this.query.joins.length > 0) {
      sql += ' ' + this.query.joins.join(' ');
    }

    if (this.query.where.length > 0) {
      sql += ' WHERE ' + this.query.where.join(' AND ');
    }

    if (this.query.orderBy.length > 0) {
      sql += ' ORDER BY ' + this.query.orderBy.join(', ');
    }

    if (this.query.limit !== undefined) {
      sql += ` LIMIT ${this.query.limit}`;
    }

    if (this.query.offset !== undefined) {
      sql += ` OFFSET ${this.query.offset}`;
    }

    return sql;
  }
}

/**
 * Convert camelCase to snake_case for database columns
 */
export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * Convert snake_case to camelCase for JavaScript objects
 */
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert object keys from camelCase to snake_case
 */
export function objectToSnakeCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    result[toSnakeCase(key)] = value;
  }

  return result;
}

/**
 * Convert object keys from snake_case to camelCase
 */
export function objectToCamelCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    result[toCamelCase(key)] = value;
  }

  return result;
}

/**
 * Generate placeholders for parameterized queries
 * @param count Number of placeholders needed
 * @returns String of comma-separated placeholders like "?, ?, ?"
 */
export function generatePlaceholders(count: number): string {
  return Array(count).fill('?').join(', ');
}

/**
 * Build INSERT SQL with placeholders
 */
export function buildInsertSQL(
  table: string,
  data: Record<string, any>,
): { sql: string; values: any[] } {
  const snakeCaseData = objectToSnakeCase(data);
  const columns = Object.keys(snakeCaseData);
  const values = Object.values(snakeCaseData);
  const placeholders = generatePlaceholders(columns.length);

  const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

  return { sql, values };
}

/**
 * Build UPDATE SQL with placeholders
 */
export function buildUpdateSQL(
  table: string,
  data: Record<string, any>,
  whereClause: string,
): { sql: string; values: any[] } {
  const snakeCaseData = objectToSnakeCase(data);
  const columns = Object.keys(snakeCaseData);
  const values = Object.values(snakeCaseData);

  const setClause = columns.map((col) => `${col} = ?`).join(', ');
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

  return { sql, values };
}

/**
 * Validate required fields in an object
 */
export function validateRequiredFields(obj: Record<string, any>, requiredFields: string[]): void {
  for (const field of requiredFields) {
    if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
      throw new Error(`Required field '${field}' is missing or empty`);
    }
  }
}
