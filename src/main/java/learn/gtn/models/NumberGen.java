package learn.gtn.models;

public class NumberGen {
    private int number;

    public NumberGen() {
        number = (int) (Math.random() * 100) + 1;
    }

    public int getNumber() {
        return number;
    }
}
