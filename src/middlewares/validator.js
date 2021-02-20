const express = require('express');
const { celebrate } = require('celebrate');

module.exports = (validator) => {
  const middlewares = [
    express.json({ limit: '25mb' }),
    celebrate(validator),
  ];
  return middlewares;
};
