module.exports = {
  secretKey: process.env.SECRET_KEY,
  db: {
    address: process.env.DATABASE_URL,
    admin: process.env.ADMIN_PASSWORD
  }
}
