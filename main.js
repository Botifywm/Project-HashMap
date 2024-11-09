function HashMap() {
  let buckets = [];
  let capacity = 16;
  const loadFactor = 0.75;
  let entry = 0;

  const set = (key, value) => {
    const node = Node();
    if (entry / capacity > loadFactor) {
      capacity *= 2;
      let newBucket = [];
      for (let i = 0; i < buckets.length; i++) {
        let current = buckets[i];
        if (current) {
          const index = hash(current.key, capacity);
          newBucket[index] = current;
        }
      }
      buckets = newBucket;
    }

    const index = hash(key, capacity);
    node.key = key;
    node.value = value;
    if (buckets[index]) {
      buckets[index].nextNode = node;
      entry++;
      return;
    }
    buckets[index] = node;
    node.nextNode = null;
    entry++;
  };

  const getKey = (key) => {
    const index = hash(key, capacity);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    let current = buckets[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.nextNode;
    }
    return null;
  };

  const hasKey = (key) => {
    const index = hash(key, capacity);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let current = buckets[index];
    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  };

  const remove = (key) => {
    const index = hash(key, capacity);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let current = buckets[index];
    let prev = buckets[index];
    while (current) {
      if (current.key === key) {
        const next = current.nextNode;
        if (next) {
          prev.nextNode = next;
          return true;
        }
        buckets.splice(index, 1);
      }
      prev = current;
      current = current.nextNode;
    }
    return false;
  };

  const length = () => entry;

  const clear = () => {
    buckets = [];
  };

  const keys = () => {
    let keyList = [];
    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];
      while (current) {
        keyList.push(current.key);
        current = current.nextNode;
      }
    }
    return keyList;
  };

  const values = () => {
    let valueList = [];
    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];
      while (current) {
        valueList.push(current.value);
        current = current.nextNode;
      }
    }
    return valueList;
  };

  const entries = () => {
    let entryList = [];
    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];
      while (current) {
        entryList.push([
          current.key,
          current.value,
          hash(current.key, capacity),
        ]);
        current = current.nextNode;
      }
    }
    return entryList;
  };

  return {
    set,
    getKey,
    hasKey,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

function Node() {
  let value = null;
  let key = null;
  let nextNode = null;
  //   const getNode = () => nextNode;
  //   const setNode = (key) => (nextNode = key);

  //   const getValue = () => value;
  //   const setValue = (val) => (value = val);
  return { value, key, nextNode };
}

function hash(key, capacity) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % capacity;
  }

  return hashCode;
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
//overwrite lion's color
test.set("lion", "rainbow");

console.log(test.entries());
console.log(test.remove("lion"));
console.log(test.entries());
