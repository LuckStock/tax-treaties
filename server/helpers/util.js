module.exports = {
  obj_extractor(obj, objKey, queryValue) {
    return obj.filter((o) => {
      if (o[objKey] === queryValue) {
        return o;
      }
      return null;
    });
  },
};

