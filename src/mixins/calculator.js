export default {
  function(items) {
    const total_items = items.reduce((a, b) => a + b);
    return total_items;
  },
};
