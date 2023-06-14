const requestCounter = () => {
  const counts = {};
  return (req, res, next) => {
    const method = req.method;
    // const limit = req.rateLimit.limit;
    // const current = req.rateLimit.current;
    // const remaining = req.rateLimit.remaining;

    // if (remaining < current <= limit) {
    //   console.log(true);
    // }
    if (!counts[method]) {
      counts[method] = 1;
    } else {
      counts[method]++;
    }

    console.log(`[${method}] Request count: ${counts[method]}`);
    next();
  };
};

module.exports = requestCounter;
