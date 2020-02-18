const selectKnobMirror = arr =>
  arr.reduce((m, item) => {
    m[item] = item;
    return m;
  }, {});

export default selectKnobMirror;
