module.exports = {
  removeNotSetProps(data) {
    return Object.keys(data)
      .reduce((result, key) => {
        if (data[key]) {
          result[key] = data[key];
        }
        return result;
      }, {});
  }
}
