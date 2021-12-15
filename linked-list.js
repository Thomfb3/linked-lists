/** Node: node for a singly linked list. */

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  };
};

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  };

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    };
    this.length++;
  };

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    };

    if (this.length === 0) this.tail = this.head;

    this.length++;
  };

  /** pop(): return & remove last item. */

  pop() {
   return this.removeAt(this.length-1);
  };

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  };

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (this.length === 0) {
      throw new Error("Invalid Index");
    }
    let currentNode = this.head;

    for (let i = 0; i < this.length; i++) {
      if (i === idx) {
        return currentNode.val;
      }
      currentNode = currentNode.next;
    }
    throw new Error("Invalid Index");
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (this.length - 1 < idx) {
      throw new Error("Invalid Index: index greater than list length");
    };
    
    if (idx === 0) {
      this.head.val = val;
      return;
    };
    
    if (this.length - 1 === idx) {
      this.tail.val = val;
      return;
    };

    let currentNode = this.head.next;

    for (let i = 1; i < this.length; i++) {
      if (i === idx) {
        currentNode.val = val;
        return;
      };
      currentNode = currentNode.next;
    };
  };

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (this.length < idx) {
      throw new Error("Invalid Index: index outside of list length");
    };

    if (idx === 0) return this.unshift(val);
    if (this.length === idx) return this.push(val);  
    
    let currentNode = this.head;

    for (let i = 0; i < this.length; i++) {
      if (i === idx - 1) {
        let newNode = new Node(val, currentNode.next);
        currentNode.next = newNode;
        this.length++;
        return;
      };
      currentNode = currentNode.next;
    };
  };

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length <= idx || idx < 0) {
      throw new Error("Invalid Index: index outside of list length");
    };

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length--;
      if (this.length < 2) this.tail = this.head;
      return val;
    };

    let currentNode = this.head;

    for (let i = 0; i < this.length; i++) {
      if (i + 1 === idx) {
        let val = currentNode.next.val;
        
        if (!currentNode.next.next) {
          this.tail = currentNode;
          currentNode.next = null;
          this.length--;
          return val;
        };

        currentNode.next = currentNode.next.next;
        this.length--;
        return val;
      };
      currentNode = currentNode.next;
    };

  };
  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let currentNode = this.head;

    while(currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    };
  
    return sum / this.length;
  };
}

module.exports = LinkedList;
