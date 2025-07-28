// Hide the user information from frontend

function maskEmail(email) {
  const [username, domain] = email.split('@');

  const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);

  return `${maskedUsername}@${domain}`;
}

exports.maskEmail = maskEmail;