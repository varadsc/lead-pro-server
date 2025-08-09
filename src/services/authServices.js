

const pool = require('../config/db'); 

const getLatestOtpForEmployee = async (employee_id) => {
    const [rows] = await pool.query(
        `SELECT otp_code, used, expires_at 
         FROM otps 
         WHERE employee_id = ? 
         ORDER BY created_at DESC 
         LIMIT 1`, 
        [employee_id]
    );

    if (!rows.length)  return null; 

    const otp = rows[0];
    const now = new Date();

    const is_expired = new Date(otp.expires_at) < now;

    return {
        otp_code: otp.otp_code,
        used: otp.used,
        is_expired
    };
};

const getRoleIdByEmployeeId = async (employee_id) => {
    const [rows] = await pool.query(
        `SELECT role_id 
         FROM role_user_mapping 
         WHERE employee_id = ? 
         LIMIT 1`,
        [employee_id]
    );

    if (!rows.length) {
        return null;
    }

    return {
        role_id: rows[0].role_id
    };
};

const createOtpForEmployee = async (employee_id, created_otp, expiry_time) => {
    await pool.query(
        `INSERT INTO otps (employee_id, otp_code, expires_at) 
         VALUES (?, ?, ?)`,
        [employee_id, created_otp, expiry_time]
    );
};


module.exports = { getLatestOtpForEmployee, getRoleIdByEmployeeId, createOtpForEmployee };
