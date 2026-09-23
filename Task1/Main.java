public class Main {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();
        // Test 1
//        list.add(2);
//        list.add(1);
//        list.add(0);

        // Test 2
//        list.add(3);
//        list.add(2);
//        list.add(1);
//        list.add(0);

        // Test 3
//        list.add(4);
//        list.add(3);
//        list.add(2);
//        list.add(1);
//        list.add(0);

        // Test 4
        //list.add(4);

        TwoThirdsOfLinkedList thirds = new TwoThirdsOfLinkedList();
        Node res = thirds.getTwoThirdsNode(list.head);
        System.out.println(res);
    }
}