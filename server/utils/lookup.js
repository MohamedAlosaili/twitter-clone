const lookup = (from, localField, foreignField, as, pipeline = []) => ({
  $lookup: {
    from: from,
    localField,
    foreignField,
    pipeline,
    as,
  },
});

export default lookup;
