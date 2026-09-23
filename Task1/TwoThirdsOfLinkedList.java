public class TwoThirdsOfLinkedList {
    public <T> Node<T> getTwoThirdsNode(Node<T> head) {
        if (head == null) return null;

        int n = 0;
        Node<T> current = head;
        while (current != null) {
            current = current.next;
            n++;
        }

        if (n <= 1) return null;

        int desiredIndex = 2 * n / 3 - 1;
        current = head;
        int index = 0;

        while (current != null) {
            if (index == desiredIndex) return current;

            current = current.next;
            index++;
        }
        return null;
    }
}