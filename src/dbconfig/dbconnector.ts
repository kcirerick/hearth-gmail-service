import { Pool } from 'pg';

export default new Pool ({
  max: 3,
  connectionString: 'postgres://postgres:Erejs7647!@localhost:5432/dbname',
  idleTimeoutMillis: 30000
})