package learn.gtn.controller;

import learn.gtn.models.NumberGen;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GuessTheNumber {
    NumberGen number = new NumberGen();

    @PutMapping("/guess")
    public ResponseEntity<Object> guess(@RequestBody String guess) {
        try {
            int guessInt = Integer.parseInt(guess);
            // strings have to be formatted as JSON strings in order to be returned as JSON, hence the strange formatting
            if (guessInt < number.getNumber()) {
                return ResponseEntity.ok("\"Too low!\"");
            } else if (guessInt > number.getNumber()) {
                return ResponseEntity.ok("\"Too high!\"");
            } else {
                return ResponseEntity.ok("\"You guessed it!\"");
            }
        } catch (NumberFormatException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}