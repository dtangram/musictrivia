// how often do you want to pull new data from the server if the user doesn't refresh the page?
const minutes = 10;
// get that time in milliseconds
const refreshTime = 1000 * 60 * minutes;
// decided if a item should be loaded from the api because it has been longer than the refresh time
export function shouldLoad(loadedAt, refreshAt = refreshTime) {
  // get the current time in milliseconds
  const now = Date.now();
  // get the difference in time between now and when this object was loaded
  const timeSinceLastLoad = now - loadedAt;
  // if the time since loaded is larger than the refresh time
  const lastLoadedLongerThanRefreshTime = timeSinceLastLoad > refreshAt;
  // return if it is outside the window and should be loaded
  return lastLoadedLongerThanRefreshTime;
}

// turn an array into an object using the id of the items as the key
export function arrayToObject(array) {
  if (!array) {
    // use the reduce function to convert the array to an object
    return array.reduce((object, item) => ({
      // keep the current object
      ...object,
      // add the item id as the key and the item as the value
      [item.id]: item,
    }), {});
  }

  return array;
}

// given an object and id remove the key of the id from the object
export function removeIdFromObject(id, object) {
  // if we destructure the item we want to remove into a variable
  // and then use the spread operator to get the rest of the object
  // we have the object with out that one key
  const { [id]: removedItem, ...objectWithoutId } = object;
  return objectWithoutId;
}

// given an array of ids and id to remove, filter the array to remove all instances of that id
export function removeIdFromArray(id, array) {
  // if the itemId is not the id return true (don't remove)
  // if the itemId is the id return false (remove from array)
  return array.filter(itemId => itemId !== id);
}
