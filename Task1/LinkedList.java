// helper class for future testing
public class LinkedList<T> {
    public int size;
    public Node<T> head;

    public LinkedList() {
        this.size = 0;
        this.head = null;
    }

    public void add(T val) {
        if (val == null) return;

        Node<T> newNode = new Node<T>(val);
        if (size != 0) {
            newNode.next = head;
        }
        head = newNode;
        size++;
    }
}