function escapeString(string = '') {
  const escapedString = string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  return escapedString;
}

exports.escapeString = escapeString;
