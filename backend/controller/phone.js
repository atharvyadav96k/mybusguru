

function maskPhone(phone) {  
  const maskedPart = phone.slice(0, -4).replace(/\d/g, '*');
  const visiblePart = phone.slice(-4);
  
  return `${maskedPart}${visiblePart}`;
}


exports.maskPhone = maskPhone;